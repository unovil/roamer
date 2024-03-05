/* import db from "$lib/prisma";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get("auth_session")

    if (!session) {
        return await resolve(event)
    }

    const user = await db.user.findUnique({
        where: {
            sessions: sessio
        },
        select: {
            
        }
    })
} */