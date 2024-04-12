import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/prisma";
import type { Section, Student, User } from "@prisma/client";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        redirect(302, "/login");
    }

    let returnInformation: {
        userInfo: Omit<User, 'hashedPassword'>,
        sectionInfo: { section: string, students: ({ user: User } & Student)[] } | null
    } = {
        userInfo: { ...event.locals.user },
        sectionInfo: null
    }

    const user = await db.user.findUnique({
        select: { role: true, student: true, admin: true },
        where: { id: event.locals.user.id }
    })

    if (user?.role == "ADMIN" && user?.admin) {
        redirect(302, "/admindashboard");
    }

    if (!user?.admin && !user?.student) {
        redirect(302, "/register/next");
    }

    if (user?.role == "STUDENT" && user?.student) {
        const section = await db.section.findUnique({
            where: { id: user.student.sectionId },
            include: {
                students: {
                    include: { user: true }
                }
            }
        })

        if (section?.students) {
            section.students.sort((a, b) => {
                // Sort by last name
                const lastNameComparison = a.user.lastName.localeCompare(b.user.lastName);
                if (lastNameComparison !== 0) return lastNameComparison;

                // If last names are equal, sort by first name
                return a.user.firstName.localeCompare(b.user.firstName);
            });
        }

        returnInformation.sectionInfo = {
            section: section?.grade + " " + section?.name,
            students: section?.students ?? []
        }
    }

    return returnInformation;
};

export const actions = {
    logout: async (event) => {
        const sessionId = event.cookies.get("auth_session") ?? "";
        await lucia.invalidateSession(sessionId);

        event.cookies.delete("auth_session", { path: "/" });
        event.locals.user = null;
        event.locals.session = null;

        redirect(302, "/");
    }
} satisfies Actions;