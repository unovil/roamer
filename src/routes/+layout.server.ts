import type { LayoutServerLoad } from "./$types"
import { redirect, type Actions } from "@sveltejs/kit"
import { lucia } from "$lib/server/auth"
import db from "$lib/prisma"

export const load: LayoutServerLoad = async event => {
  console.log(event.locals.user)

  if (!event.locals.user) {
    return { isLoggedIn: false }
  }

  const user = await db.user.findUnique({
    select: { role: true, student: true, admin: true },
    where: { id: event.locals.user.id },
  })

  if (user?.role == "STUDENT" && user?.student) {
    return { isStudent: true }
  }

  if (!user?.admin && !user?.student) {
    return { needsRegisterFollowup: true }
  }

  if (user?.role == "ADMIN" && user?.admin) {
    return { isAdmin: true }
  }
}
