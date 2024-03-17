import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import db from "$lib/prisma";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, "/login");
	}

    const user = await db.user.findUnique({
        select: { role: true, student: true, admin: true },
        where: { id: event.locals.user.id }
    })

    if (!user?.admin && !user?.student) {
        redirect(302, "/register/next");
    }

	return {
		username: event.locals.user.firstName + " " + event.locals.user.lastName
	}
};

export const actions = {
    default: async (event) => {
        const sessionId = event.cookies.get("auth_session") ?? "";
        await lucia.invalidateSession(sessionId);

        event.cookies.delete("auth_session", { path: "/" });
        event.locals.user = null;
        event.locals.session = null;

        redirect(302, "/");
    }
} satisfies Actions;