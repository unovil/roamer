import db from '$lib/prisma'
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from "$lib/server/auth";
import { Argon2id } from "oslo/password";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const password = formData.get("password");

        if (typeof email !== "string" ||
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
        ) {
            return fail(400, {
                invalidEmail: true,
                error: "Invalid email address."
            })
        }

        if (typeof firstName !== "string" ||
            firstName.trim().length == 0
        ) {
            return fail(400, {
                invalidFirstName: true,
                error: "First name should not be empty."
            })
        }

        if (typeof lastName !== "string" ||
            lastName.trim().length == 0
        ) {
            return fail(400, {
                invalidLastName: true,
                error: "Last name should not be empty."
            })
        }

        if (typeof password !== "string" ||
            password.length < 8 ||
            password.length > 32
        ) {
            return fail(400, {
                invalidPass: true,
                error: "Password must be between 8 and 32 characters."
            })
        }

        const hashedPassword = await new Argon2id().hash(password);

        try {
            // Create the user in the database
            const response = await db.user.create({
                data: {
                    email: email.trim().toLowerCase() as string,
                    firstName: firstName.trim() as string,
                    lastName: lastName.trim() as string,
                    hashedPassword: hashedPassword as string
                }
            });

            const session = await lucia.createSession(response.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
            
            console.log("User created:", response);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&
                err.code === "P2002" // unique constraint
            ) { 
                return fail(400, {
                    duplicateUser: true,
                    error: "A user with this email address was already found. Try with a different email."
                })
            } else throw err;
        }

        redirect(302, "/dashboard");
    }
} satisfies Actions;