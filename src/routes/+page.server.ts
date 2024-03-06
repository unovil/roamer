import db from '$lib/prisma'
import type { Prisma, User } from '@prisma/client'
import type { PageServerLoad } from './$types'
import { redirect, type Actions } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
    console.log(event.locals.user);

    return {
        username: event.locals?.user?.firstName + " " + event.locals?.user?.lastName,
        isLoggedIn: event.locals.user ? true : false
    };
};

export const actions = {
    default: async (event) => {
        const cookieHeader = event.cookies.get("auth_session") ?? "";
        const sessionId = lucia.readSessionCookie(cookieHeader) ?? "";

        await lucia.invalidateSession(sessionId);

        event.cookies.delete("auth_session", {path:"/"});

        redirect(302, "/");
    }
} satisfies Actions;