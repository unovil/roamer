import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$lib/prisma";

export const load: PageServerLoad = async ({ url, locals }) => {
    
    const searchTerm = url.searchParams.get('term') || "";

    if (!locals.user) {
        redirect(302, "/login");
    }

    const user = await db.user.findUnique({
        select: { role: true, student: true, admin: true },
        where: { id: locals.user.id }
    })

    if (!user?.admin && !user?.student) {
        redirect(302, "/register/next");
    }

    return {searchTerm}
};