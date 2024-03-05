import db from '$lib/prisma'
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from "$lib/server/auth";
import { Argon2id } from "oslo/password";

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" ||
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
        ) {
            return fail(400, {
                invalidEmail: true,
                error: "Invalid email address."
            })
        }

        const user = await db.user.findUnique({
            where: {
                email: email.trim().toLowerCase() as string
            }
        });

        if (!user) return fail(400, {
            invalidUser: true,
            error: "User not found. Type your email correctly, or register first."
        });

        console.log("User found:", user);

        if (typeof password !== "string" ||
            password.length < 8 ||
            password.length > 32
        ) {
            return fail(400, {
                invalidPass: true,
                error: "Incorrect password."
            })
        }

        const validPassword = await new Argon2id().verify(user.hashedPassword, password);

        if (!validPassword) return fail(400, {
            incorrectPass: true,
            error: "Incorrect password."
        })

        const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});


        redirect(302, "/dashboard");
    }
} satisfies Actions;