import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$lib/prisma";

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) {
        redirect(302, "/login");
    }

    const user = await db.user.findUnique({
        select: {
            role: true,
            student: true,
            admin: true
        },
        where: { id: locals.user.id }
    })

    if (!user?.admin && !user?.student) {
        redirect(302, "/register/next");
    }

    if (Number.isNaN(parseInt(params.facilityId))) {
        throw error(404, "Facility not found")
    }

    const facility = await db.facility.findUnique({
        include: { admins: {include: {user: {select: {firstName: true, lastName: true, email: true}}}} },
        where: { id: parseInt(params.facilityId) },
    })

    if (facility === null) {
        throw error(404, "Facility not found")
    }

    return { facility }
};