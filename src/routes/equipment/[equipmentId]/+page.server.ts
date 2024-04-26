import { redirect, error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import db from "$lib/prisma"

export const load: PageServerLoad = async ({ params, locals, cookies }) => {
  const isBookSuccess = typeof cookies.get("Booking-Success") !== "undefined"
  if (isBookSuccess)
    cookies.set("Booking-Success", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0
    })

  if (!locals.user) {
    redirect(302, "/login")
  }

  const user = await db.user.findUnique({
    select: {
      role: true,
      student: true,
      admin: true,
      schoolId: true
    },
    where: { id: locals.user.id }
  })

  if (!user?.admin && !user?.student) {
    redirect(302, "/register/next")
  }

  if (Number.isNaN(parseInt(params.equipmentId))) {
    throw error(400, "Bad request")
  }

  const equipment = await db.equipment.findUnique({
    include: {
      admins: {
        include: {
          user: { select: { firstName: true, lastName: true, email: true } }
        }
      }
    },
    where: { id: parseInt(params.equipmentId) }
  })

  if (equipment === null) {
    throw error(404, "Equipment not found")
  }

  if (equipment.schoolId !== user.schoolId) {
    throw error(401, "Unauthorized")
  }

  return { equipment, isBookSuccess }
}
