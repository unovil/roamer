import { fail, redirect } from "@sveltejs/kit";
import db from "$lib/prisma";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Admin, Department, Facility } from "@prisma/client";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        redirect(302, "/login");
    }

    const user = await db.user.findUnique({
        select: { role: true, student: true, admin: true, firstName: true, lastName: true, email: true },
        where: { id: event.locals.user.id }
    })

    if (user?.student) {
        redirect(302, "/dashboard");
    }

    if (!user?.admin && !user?.student) {
        redirect(302, "/register/next");
    }

    // fetch admins
    const admins = await db.admin.findMany({
        where: { user: { schoolId: event.locals.user.schoolId } },
        select: { id: true, user: { select: { firstName: true, lastName: true, email: true } } }
    })

    // sort admins by admin.user.lastName and admin.user.firstName
    admins.sort((a, b) => {
        if (a.user.lastName > b.user.lastName) return 1;
        if (a.user.lastName < b.user.lastName) return -1;
        if (a.user.firstName > b.user.firstName) return 1;
        if (a.user.firstName < b.user.firstName) return -1;
        return 0;
    })

    const { firstName, lastName, email } = user

    return { adminInfo: { user: { email, firstName, lastName }, id: user?.admin?.id ?? 0 }, admins }
};

export const actions = {
    default: async ({ request, locals }) => {
        const formInfo = Object.fromEntries(await request.formData())
        const { title, description, file, admins, department } = formInfo as {
            title: string,
            description: string,
            file: File,
            admins: string,
            department: Department
        }

        console.log(`title: ${title}`)
        console.log(`description: ${description}`)
        console.log(`file: ${file}`)
        console.log(`admins: ${admins}`)
        console.log(`department: ${department}`)

        if (!title || title == "") {
            return fail(400, {
                noTitle: true,
                error: "Please enter a facility name."
            })
        }

        if (!description || description == "") {
            return fail(400, {
                noDescription: true,
                error: "Please enter a description."
            })
        }

        if (!(file.name) || (file.name === "undefined") || !(file.size)) {
            return fail(400, {
                noFile: true,
                error: "Please select a file to upload."
            })
        }



        const adminResponse = await db.admin.findUnique({
            where: { userId: locals.user?.id },
            include: { user: { select: { schoolId: true } } }
        })

        if (!adminResponse || !adminResponse.user.schoolId) {
            return fail(400, {
                unauthorized: true,
                error: "You are not an administrator. Try refreshing the site."
            })
        }

        const response = await db.facility.create({
            data: {
                name: title,
                description: description,
                image: Buffer.from(await file.arrayBuffer()),
                admins: {
                    connect: { id: adminResponse.id }
                },
                blockedDates: { dates: new Array<Date>() },
                schoolId: adminResponse.user.schoolId
            }
        })

        return { response }
    }
} satisfies Actions;