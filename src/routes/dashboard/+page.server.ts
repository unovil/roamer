import { lucia } from "$lib/server/auth"
import { error, fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import db from "$lib/prisma"
import type { Section, Student, User } from "@prisma/client"

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    redirect(302, "/login")
  }

  const user = await db.user.findUnique({
    select: { role: true, student: true, admin: true },
    where: { id: event.locals.user.id }
  })

  if (user?.role == "ADMIN" && user?.admin) {
    redirect(302, "/admindashboard")
  }

  if (!user?.admin && !user?.student) {
    redirect(302, "/register/next")
  }

  if (!(user?.role == "STUDENT" && user?.student)) {
    throw error(401, "Unauthorized")
  }

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
      const lastNameComparison = a.user.lastName.localeCompare(b.user.lastName)
      if (lastNameComparison !== 0) return lastNameComparison

      // If last names are equal, sort by first name
      return a.user.firstName.localeCompare(b.user.firstName)
    })
  }

  const recentRequests = await db.request.findMany({
    where: { students: { some: { id: user.student.id } } },
    include: {
      facility: true,
      equipment: true
    },
    orderBy: [{ dateCreated: "desc" }, { id: "desc" }],
    take: 3
  })

  const mappedRequests = recentRequests.map((request) => {
    let status = { name: "WAITING", class: "font-medium text-yellow-600" }
    if (
      request.requestStatus.every(
        (status) => status.requestStatus === "APPROVED"
      )
    ) {
      status = { name: "APPROVED", class: "font-medium text-green-600" }
    } else if (
      request.requestStatus.some(
        (status) => status.requestStatus === "REJECTED"
      )
    ) {
      status = { name: "DENIED", class: "font-medium text-red-600" }
    }

    return {
      ...request,
      item: request.facility ? request.facility : request.equipment,
      status
    }
  })

  return {
    userInfo: { ...event.locals.user },
    sectionInfo: {
      section: section?.grade + " " + section?.name,
      students: section?.students ?? []
    },
    mappedRequests
  }
}

export const actions = {
  logout: async (event) => {
    const sessionId = event.cookies.get("auth_session") ?? ""
    await lucia.invalidateSession(sessionId)

    event.cookies.delete("auth_session", { path: "/" })
    event.locals.user = null
    event.locals.session = null

    redirect(302, "/")
  }
} satisfies Actions
