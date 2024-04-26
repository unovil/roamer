import type { PageServerLoad } from "./$types"
import { redirect, type Actions } from "@sveltejs/kit"
import { lucia } from "$lib/server/auth"
import db from "$lib/prisma"

export const load: PageServerLoad = async event => {
  console.log(event.locals.user)

  return {
    username:
      event.locals?.user?.firstName + " " + event.locals?.user?.lastName,
    isLoggedIn: event.locals.user ? true : false,
  }
}

export const actions = {
  default: async event => {
    const sessionId = event.cookies.get("auth_session") ?? ""
    await lucia.invalidateSession(sessionId)

    event.cookies.delete("auth_session", { path: "/" })
    event.locals.user = null
    event.locals.session = null

    redirect(302, "/")
  },
} satisfies Actions
