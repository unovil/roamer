import type { PageServerLoad } from "./$types"
import db from "$lib/prisma"
import { error, fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

interface Student {
  id: number
  lrn: string
  firstName: string
  lastName: string
  email: string
  section: string
  grade: number
}

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    redirect(302, "/login")
  }

  const user = await db.user.findUnique({
    select: {
      role: true,
      student: true,
      admin: true,
      schoolId: true
    },
    where: { id: locals.user.id }
  })

  if (user === null || typeof user === "undefined") {
    throw error(401, "Unauthorized")
  }

  if (!user?.admin && !user?.student) {
    redirect(302, "/register/next")
  }

  if (!user?.student) {
    redirect(302, "/admindashboard")
  }

  if (Number.isNaN(parseInt(params.facilityId))) {
    throw error(400, "Bad request")
  }

  const facility = await db.facility.findUnique({
    include: {
      admins: {
        include: {
          user: { select: { firstName: true, lastName: true, email: true } }
        }
      }
    },
    where: { id: parseInt(params.facilityId) }
  })

  if (facility === null) {
    throw error(404, "Facility not found")
  }

  if (facility.schoolId !== user.schoolId) {
    throw error(401, "Unauthorized")
  }

  const admins = facility.admins.map((admin) => {
    return {
      firstName: admin.user.firstName,
      lastName: admin.user.lastName,
      email: admin.user.email,
      id: admin.id
    }
  })

  const students = (
    await db.student.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        section: { select: { name: true, grade: true } }
      },
      where: { user: { schoolId: user.schoolId } }
    })
  ).reduce((acc: { [key: number]: Student }, student) => {
    acc[student.id] = {
      id: student.id,
      lrn: student.lrn,
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      email: student.user.email,
      section: student.section.name,
      grade: student.section.grade
    }

    return acc
  }, {})

  return {
    userStudentId: user.student.id,
    facility,
    students,
    admins,
    blockedDates: facility.blockedDates
  }
}

export const actions = {
  default: async ({ request, params, cookies }) => {
    type DateStringRange = { start: string; end: string; id: string }
    type DateRange = { start: Date; end: Date; id: number }
    const formInfo = Object.fromEntries(await request.formData())
    const { requestDates, studentIds, requestDescription } = formInfo as {
      requestDates: string
      studentIds: string
      requestDescription: string
    }

    const requestDatesArray: DateStringRange[] = JSON.parse(requestDates)

    if (
      !requestDatesArray ||
      requestDatesArray.some(
        (dateRange) =>
          Number.isNaN(new Date(dateRange.start)) ||
          Number.isNaN(new Date(dateRange.end)) ||
          Number.parseInt(dateRange.id)
      )
    ) {
      return fail(400, {
        noDates: true,
        error: "No date was inputted."
      })
    }

    const requestDatesRanges = requestDatesArray.map((dateRange) => {
      return {
        start: new Date(dateRange.start),
        end: new Date(dateRange.end),
        id: parseInt(dateRange.id)
      }
    })

    requestDatesRanges.forEach((bookingDates) => {
      if (
        bookingDates.end <= bookingDates.start ||
        bookingDates.start.getTime() <= new Date().getTime()
      ) {
        return fail(400, {
          wrongDates: true,
          error: "You entered the wrong dates."
        })
      }
    })

    const parsedStudentIds = studentIds
      .slice(1, studentIds.length - 1)
      .split(",")
      .map((id) => parseInt(id))

    // shouldn't happen as the profile user is already selected
    if (!studentIds || studentIds.length == 2 || parsedStudentIds.length < 1) {
      return fail(400, {
        noStudents: true,
        error: "Please select at least one student."
      })
    }

    const facility = await db.facility.findUnique({
      select: { admins: { select: { id: true } }, blockedDates: true },
      where: { id: parseInt(params.facilityId) }
    })

    const adminIds = facility?.admins.map((admin) => admin.id) || []
    const blockedDates = facility?.blockedDates || []

    await db.request.create({
      data: {
        facilityId: parseInt(params.facilityId),
        students: {
          connect: parsedStudentIds.map((id) => {
            return { id }
          })
        },
        requestDates: requestDatesRanges.map(({ start, end }) => {
          return { start, end }
        }),
        description: requestDescription.trim(),
        admins: {
          connect: adminIds.map((id) => {
            return { id }
          })
        },
        requestStatus: adminIds.map((id) => {
          return { adminId: id, requestStatus: "WAITING", reason: "" }
        })
      }
    })

    cookies.set("Booking-Success", "true", { path: "/" })

    redirect(302, `/facility/${params.facilityId}`)
  }
} satisfies Actions
