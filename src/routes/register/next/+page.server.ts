import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import db from "$lib/prisma";

export const actions = {
    role: async ({ request }) => {
        const formData = await request.formData()
        const userRole = formData.get("role") as string
        const schoolId = formData.get("schoolId") as string
        const roleInfo = { userRole, schoolId }

        console.log(`role: ${userRole}`)
        console.log(`school id: ${schoolId}`)

        if (typeof userRole !== "string" ||
            userRole == null) {
            console.log("no user role selected")
            return fail(400, {
                noSelectedRole: true,
                error: "Please select a role.",
                data: { ...roleInfo }
            })
        }

        if (/^\d{6}$/.test(schoolId) == false) {
            return fail(400, {
                incorrectIdLength: true,
                error: "The ID format is incorrect. Enter 6 numeric characters.",
                data: { ...roleInfo }
            })
        }

        const response = await db.school.findUnique({
            select: { name: true },
            where: { depedId: schoolId }
        })

        if (response == null || typeof response === "undefined") {
            return fail(400, {
                schoolNotFound: true,
                error: "The school ID was not found.",
                data: { ...roleInfo }
            })
        }

        return {
            response: {
                schoolName: response.name,
                role: userRole
            }
        };
    }
} satisfies Actions;