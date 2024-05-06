import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import db from "$lib/prisma"
import { UserRole } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    redirect(302, "/login")
  }

  const user = await db.user.findUnique({
    select: { role: true, student: true, admin: true },
    where: { id: event.locals.user.id }
  })

  if (user?.admin || user?.student) {
    redirect(302, "/dashboard")
  }
}

export const actions = {
  role: async ({ request, cookies }) => {
    const roleInfo = Object.fromEntries(await request.formData())
    const { role, schoolId } = roleInfo

    console.log(roleInfo)

    console.log(`role: ${role}`)
    console.log(`school id: ${schoolId}`)

    if (typeof role !== "string" || role == null || role === "") {
      console.log("no user role selected")
      return fail(400, {
        noSelectedRole: true,
        error: "Please select a role.",
        data: { ...roleInfo }
      })
    }

    if (typeof schoolId !== "string" || /^\d{6}$/.test(schoolId) == false) {
      return fail(400, {
        incorrectIdLength: true,
        error: "The ID format is incorrect. Enter 6 numeric characters.",
        data: { ...roleInfo }
      })
    }

    const response = await db.school.findUnique({
      select: {
        name: true,
        sections: true
      },
      where: { depedId: schoolId }
    })

    if (response == null || typeof response === "undefined") {
      return fail(400, {
        schoolNotFound: true,
        error: "The school ID was not found.",
        data: { ...roleInfo }
      })
    }

    if (response.sections.length == 0 || response.sections == null) {
      return fail(400, {
        schoolIncomplete: true,
        error: `The school, ${response.name}, has no sections. Please contact the school administrator.`,
        data: { ...roleInfo }
      })
    }

    const sessionId = cookies.get("auth_session")
    const sessionResponse = await db.session.findUnique({
      select: { user: true },
      where: { id: sessionId }
    })

    if (!sessionId || !sessionResponse) {
      return fail(401, {
        unauthorized: true,
        error:
          "An error has occurred with your user session. Try to log in again.",
        data: { ...roleInfo }
      })
    }

    await db.user.update({
      where: { id: sessionResponse.user.id },
      data: {
        role: role === "student" ? UserRole.STUDENT : UserRole.ADMIN,
        school: {
          connect: { depedId: schoolId }
        }
      }
    })

    if (role === "admin") {
      await db.admin.create({
        data: {
          user: {
            connect: {
              id: sessionResponse.user.id
            }
          },
          departments: {
            departments: []
          }
        }
      })
    }

    return {
      response: {
        schoolName: response.name,
        role: role,
        sections: response.sections
      }
    }
  },

  roleNext: async ({ request, cookies }) => {
    const { lrn, section } = Object.fromEntries(await request.formData())
    const registrationInfo = { lrn, section }

    if (typeof lrn !== "string" || /^\d{12}$/.test(lrn) == false) {
      return fail(400, {
        invalidLrn: true,
        error: "The LRN format is incorrect. Enter 12 numeric characters.",
        data: { ...registrationInfo }
      })
    }

    if (typeof section !== "string" || section.length == 0 || isNaN(+section)) {
      return fail(400, {
        blankSection: true,
        error: "The section is blank. Please select a section.",
        data: { ...registrationInfo }
      })
    }

    const sessionId = cookies.get("auth_session")
    const sessionResponse = await db.session.findUnique({
      select: { user: true },
      where: { id: sessionId }
    })

    if (!sessionId || !sessionResponse) {
      return fail(401, {
        unauthorized: true,
        error:
          "An error has occurred with your user session. Try to log in again.",
        data: { ...registrationInfo }
      })
    }

    try {
      await db.user.update({
        where: { id: sessionResponse.user.id },
        data: {
          student: {
            create: {
              lrn: lrn,
              sectionId: Number(section)
            }
          },
          role: UserRole.STUDENT
        }
      })

      redirect(302, "/dashboard")
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002" // unique constraint
      ) {
        return fail(400, {
          duplicateUser: true,
          error: "A user with this LRN was already found."
        })
      } else throw err
    }
  },

  roleNextAdmin: async ({ cookies }) => {
    const sessionId = cookies.get("auth_session")
    const sessionResponse = await db.session.findUnique({
      select: { user: true },
      where: { id: sessionId }
    })

    if (!sessionId || !sessionResponse) {
      return fail(401, {
        unauthorized: true,
        error:
          "An error has occurred with your user session. Try to log in again."
      })
    }

    await db.user.update({
      where: { id: sessionResponse.user.id },
      data: {
        admin: {
          create: {
            facilities: {},
            departments: { departments: null },
            requests: {},
            equipments: {}
          }
        },
        role: UserRole.ADMIN
      }
    })

    redirect(302, "/dashboard")
  },

  redirectDashboard: async () => {
    redirect(302, "/dashboard")
  }
} satisfies Actions
