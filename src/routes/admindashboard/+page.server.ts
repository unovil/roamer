import { redirect } from "@sveltejs/kit";
import type { Equipment, Facility, Student, User } from "@prisma/client";
import db from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        redirect(302, "/login");
    }

    let returnInformation: {
        userInfo: Omit<User, 'hashedPassword'>,
        facilities: ({ admins: { user: Pick<User, 'id' | 'firstName' | 'lastName'> }[]; } & Facility)[] | null,
        equipments: ({ admins: { user: Pick<User, 'id' | 'firstName' | 'lastName'> }[]; } & Equipment)[] | null
    } = {
        userInfo: { ...event.locals.user },
        facilities: null,
        equipments: null
    }

    const user = await db.user.findUnique({
        select: { role: true, student: true, admin: true },
        where: { id: event.locals.user.id }
    })

    if (user?.role == "STUDENT" && user?.student) {
        redirect(302, "/dashboard");
    }

    if (!user?.admin && !user?.student) {
        redirect(302, "/register/next");
    }

    if (user?.role == "ADMIN" && user?.admin) {
        const response = await db.admin.findUnique({
            select: {
                facilities: {
                    include: {
                        admins: {
                            select: {
                                user: { select: { firstName: true, lastName: true, id: true } }
                            }
                        }
                    }
                },
                equipments: {
                    include: {
                        admins: {
                            select: {
                                user: { select: { firstName: true, lastName: true, id: true } }
                            }
                        }
                    }
                }
            },
            where: { userId: event.locals.user.id }
        })

        returnInformation.facilities = response?.facilities ?? null
        returnInformation.equipments = response?.equipments ?? null
    }

    return returnInformation;
};