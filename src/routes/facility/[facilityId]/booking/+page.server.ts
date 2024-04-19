import type { PageServerLoad } from "./$types";
import db from "$lib/prisma";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

interface Student {
    id: number;
    lrn: string;
    firstName: string;
    lastName: string;
    email: string;
    section: string;
    grade: number;
}

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) {
        redirect(302, "/login");
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
        redirect(302, "/register/next");
    }

    if (!user?.student) {
        redirect(302, "/admindashboard")
    }

    if (Number.isNaN(parseInt(params.facilityId))) {
        throw error(400, "Bad request")
    }

    const facility = await db.facility.findUnique({
        include: { admins: { include: { user: { select: { firstName: true, lastName: true, email: true } } } } },
        where: { id: parseInt(params.facilityId) },
    })

    if (facility === null) {
        throw error(404, "Facility not found")
    }

    if (facility.schoolId !== user.schoolId) {
        throw error(401, "Unauthorized")
    }

    const admins = facility.admins.map(admin => {
        return {
            firstName: admin.user.firstName,
            lastName: admin.user.lastName,
            email: admin.user.email,
            id: admin.id
        }
    })

    const students = (await db.student.findMany({
        include: {
            user: { select: { firstName: true, lastName: true, email: true } },
            section: { select: { name: true, grade: true } }
        },
        where: { user: { schoolId: user.schoolId } }
    })).reduce((acc: { [key: number]: Student }, student) => {
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

    return { userStudentId: user.student.id, facility, students, admins, blockedDates: facility.blockedDates }
}

export const actions = {
    default: async ({ request, params }) => {
        const formInfo = Object.fromEntries(await request.formData())
        const { startDate, endDate, studentIds } = formInfo as {
            startDate: string,
            endDate: string,
            studentIds: string
        }

        const bookingDates = { start: Date.parse(startDate), end: Date.parse(endDate) }
        if (Number.isNaN(bookingDates.start) || Number.isNaN(bookingDates.end)) {
            return fail(400, {
                noDates: true,
                error: "No date was inputted."
            })
        }

        if ((bookingDates.end <= bookingDates.start) ||
            (bookingDates.start <= Date.parse(Date()))) {
            return fail(400, {
                wrongDates: true,
                error: "You entered the wrong dates."
            })
        }

        const studentsArray = studentIds.slice(1, studentIds.length - 1).split(",").map(id => parseInt(id))

        // shouldn't happen as the profile user is already selected
        if (!studentIds || studentIds.length == 2 || studentsArray.length < 1) {
            return fail(400, {
                noStudents: true,
                error: "Please select at least one student."
            })
        }

        const request = await db.request.create({
            data: {
                facilityId: parseInt(params.facilityId),
                students: { connect },
                bookingDates: bookingDates
            }
        })
    }
} satisfies Actions;