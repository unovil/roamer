import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, "/login");
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