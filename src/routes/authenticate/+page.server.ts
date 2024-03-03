import db from '$lib/prisma'
import bcrypt from "bcryptjs";
import type { Actions } from "@sveltejs/kit";
import { fail } from '@sveltejs/kit';

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();

        const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10);

        // Create the user in the database
        const response = await db.user.create({
            data: {
                email: formData.get("email") as string,
                firstName: formData.get("firstName") as string,
                middleName: formData.get("middleName") as string,
                lastName: formData.get("lastName") as string,
                password: hashedPassword
            }
        });

        console.log("User created:", response);

        return { success: true, feed: response };
    },

    login: async ({ request }) => {
        const formData = await request.formData();

        const user = await db.user.findUnique({
            where: {
                email: formData.get("email") as string
            }
        });

        if (!user) return fail(422, {
            description: formData.get("email"),
            error: "User not found. Type your email correctly, or register first."
        });

        console.log("User found:", user);

        const passwordMatch = await bcrypt.compare(formData.get("password") as string, user.password);
        if (!passwordMatch) return fail(422, {
            description: formData.get("email"),
            error: "Incorrect password. Try again."
        });

        return { success: true, feed: user };
    }
} satisfies Actions