import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$lib/prisma";

export const load: PageServerLoad = async ({ url, locals }) => {
    const searchTerm = url.searchParams.get('term') || "";
    const searchCat: "facility" | "equipment" = (url.searchParams.get('cat') != "equipment") ? "facility" : "equipment";

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

    if (searchTerm == "") return {searchCat};

    const results = (searchCat == "facility") ?
        await db.facility.findMany({
            select: {
                name: true,
                department: true,
                id: true,
                admins: {
                    select: {
                        user: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                },
                image: true
            },
            where: { name: { contains: searchTerm } },
        }) : await db.equipment.findMany({
            select: {
                name: true,
                department: true,
                id: true,
                admins: {
                    select: {
                        user: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                },
                image: true
            },
            where: { name: { contains: searchTerm } },
        })

    return { searchTerm, searchCat, results }
};