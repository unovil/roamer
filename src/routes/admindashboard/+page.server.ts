import { error, redirect } from "@sveltejs/kit"
import type { Equipment, Facility, Student, User } from "@prisma/client"
import db from "$lib/prisma"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    redirect(302, "/login")
  }

  const user = await db.user.findUnique({
    select: { role: true, student: true, admin: true },
    where: { id: event.locals.user.id }
  })

  if (user?.role == "STUDENT" && user?.student) {
    throw error(401, "Unauthorized")
  }

  if (!user?.admin && !user?.student) {
    redirect(302, "/register/next")
  }

  if (!(user?.role == "ADMIN" || user?.admin)) {
    throw error(401, "Unauthorized")
  }

  const response = await db.admin.findUnique({
    select: {
      facilities: {
        include: {
          admins: {
            select: {
              user: { select: { firstName: true, lastName: true, id: true } }
            }
          }
        }
      },
      equipments: {
        include: {
          admins: {
            select: {
              user: { select: { firstName: true, lastName: true, id: true } }
            }
          }
        }
      }
    },
    where: { userId: event.locals.user.id }
  })

  const requests = await db.request.findMany({
    where: { admins: { some: { userId: event.locals.user.id } } },
    select: {
      id: true,
      requestStatus: true,
      facility: { select: { name: true, id: true, blockedDates: true } },
      equipment: { select: { name: true, id: true, blockedDates: true } },
      students: {
        include: {
          user: { select: { firstName: true, lastName: true, id: true } }
        }
      },
      admins: {
        include: {
          user: { select: { firstName: true, lastName: true, id: true } }
        }
      }
    }
  })

  return {
    facilities: response?.facilities,
    equipments: response?.equipments,
    requests,
    userInfo: { ...event.locals.user }
  }
}
