import { error, fail, redirect } from "@sveltejs/kit";
import db from "$lib/prisma";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Admin, Department, Facility } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { writeFile } from 'node:fs/promises';
import path from 'path';
import { extname } from "node:path";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        redirect(302, "/login");
    }

    const user = await db.user.findUnique({
        select: { role: true, student: true, admin: true, firstName: true, lastName: true, email: true },
        where: { id: event.locals.user.id }
    })

    if (user?.student) {
        throw error(401, "Unauthorized");
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

        if (department == null || typeof department == "undefined") {
            return fail(400, {
                noDepartment: true,
                error: "Please select a specific department."
            })
        }

        let adminsArray = admins.slice(1, admins.length - 1).split(",").map(id => parseInt(id))

        if (!admins || admins.length == 2 || adminsArray.length < 1) {
            return fail(400, {
                noAdmins: true,
                error: "Please select at least one admin."
            })
        }

        const userAdminResponse = await db.admin.findUnique({
            where: { userId: locals.user?.id },
            include: { user: { select: { schoolId: true } } }
        })

        if (!userAdminResponse || !userAdminResponse.user.schoolId) {
            return fail(400, {
                unauthorized: true,
                error: "You are not an administrator. Try refreshing the site."
            })
        }

        const chosenAdminsResponse = await db.admin.findMany({
            select: {
                id: true
            },
            where: {
                id: { in: adminsArray }
            }
        })

        if (chosenAdminsResponse.length != adminsArray.length) {
            return fail(400, {
                invalidAdmins: true,
                error: "One or more of the selected admins are invalid."
            })
        }

        const filePath = path.join('uploads', `${crypto.randomUUID()}${extname(file.name)}`)
        await writeFile(path.join('static', filePath), Buffer.from(await file.arrayBuffer()))

        try {
            const response = await db.facility.create({
                data: {
                    name: title,
                    description: description,
                    image: filePath,
                    admins: { connect: adminsArray.map(id => ({ id })) },
                    blockedDates: { dates: new Array<Date>() },
                    schoolId: userAdminResponse.user.schoolId,
                    department
                }
            })
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                console.log(err)

                return fail(400, {
                    someError: true,
                    error: "Something went wrong. Please try again."
                })
            } else throw err
        }

        return redirect(302, "/admindashboard")
    }
} satisfies Actions;