import db from "$lib/prisma"
import { error, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async event => {
  if (!event.locals.user) {
    redirect(302, "/login")
  }

  const user = await db.user.findUnique({
    select: { role: true, student: true, admin: true },
    where: { id: event.locals.user.id },
  })

  if (!user) {
    throw error(401, "Unauthorized")
  }

  if (!user.admin && !user.student) {
    redirect(302, "/register/next")
  }

  const isValidStudent = user.role == "STUDENT" && user.student ? true : false
  const isValidAdmin = user.role == "ADMIN" && user.admin ? true : false

  if (!isValidAdmin && !isValidStudent) {
    throw error(401, "Unauthorized")
  }

  const requests = await db.request.findMany({
    where: isValidStudent
      ? { students: { some: { userId: event.locals.user.id } } }
      : { admins: { some: { userId: event.locals.user.id } } },
    select: {
      id: true,
      requestStatus: true,
      requestDates: true,
      description: true,
      facility: {
        select: { name: true, id: true, blockedDates: true, image: true },
      },
      equipment: {
        select: { name: true, id: true, blockedDates: true, image: true },
      },
      students: {
        include: {
          user: { select: { firstName: true, lastName: true, id: true } },
          section: { select: { grade: true, name: true, id: true } },
        },
      },
      admins: {
        include: {
          user: { select: { firstName: true, lastName: true, id: true } },
        },
      },
    },
  })

  return { requests, user, isValidAdmin, isValidStudent }
}

export const actions = {
  approve: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData())
    //{ itemId: '8', type: 'facility', adminId: '24' }
    const { type, adminId, requestId } = formData as {
      type: "facility" | "equipment"
      adminId: string
      requestId: string
    }

    if (!type || !adminId || !requestId) {
      throw error(400, "Invalid request, missing fields")
    }

    const parsedAdminId = Number.parseInt(adminId)
    const parsedRequestId = Number.parseInt(requestId)

    if (Number.isNaN(parsedAdminId) || Number.isNaN(parsedRequestId)) {
      throw error(400, "Invalid request, wrong fields")
    }

    const placeRequest = await db.request.findUnique({
      where: { id: parsedRequestId },
      select: {
        requestStatus: true,
        facility: true,
        equipment: true,
        requestDates: true,
        id: true,
      },
    })

    if (!placeRequest || !placeRequest.requestStatus) {
      throw error(400, "Invalid request, no request found")
    }

    if (!placeRequest.equipment && !placeRequest.facility) {
      throw error(400, "Invalid request, wrong request fields")
    }

    let adminStatus = placeRequest?.requestStatus.find(
      status => status.adminId === parsedAdminId
    )
    if (!adminStatus) {
      throw error(400, "Invalid request, no admin found")
    }
    adminStatus.requestStatus = "APPROVED"

    await db.request.update({
      where: { id: parsedRequestId },
      data: {
        requestStatus: placeRequest?.requestStatus,
      },
    })

    if (
      !placeRequest?.requestStatus
        .map(status => status.requestStatus)
        .every(status => status === "APPROVED")
    )
      return

    if (type === "facility") {
      let blockedDates = Array.isArray(placeRequest.facility?.blockedDates)
        ? placeRequest.facility?.blockedDates
        : []
      blockedDates = blockedDates.concat(placeRequest.requestDates)

      const newFacility = await db.facility.update({
        where: { id: placeRequest.facility?.id },
        data: {
          blockedDates,
        },
      })

      console.log(`New facility: ${newFacility}`)
    } else if (type === "equipment") {
      let blockedDates = Array.isArray(placeRequest.facility?.blockedDates)
        ? placeRequest.facility?.blockedDates
        : []
      blockedDates = blockedDates.concat(placeRequest.requestDates)

      const newEquipment = await db.equipment.update({
        where: { id: placeRequest.equipment?.id },
        data: {
          blockedDates,
        },
      })

      console.log(`New equipment: ${newEquipment}`)
    } else {
      throw error(400, "Invalid request, wrong type")
    }
  },
  deny: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData())
    //{ itemId: '8', type: 'facility', adminId: '24' }
    const { type, adminId, requestId } = formData as {
      type: "facility" | "equipment"
      adminId: string
      requestId: string
    }

    if (!type || !adminId || !requestId) {
      throw error(400, "Invalid request")
    }

    const parsedAdminId = Number.parseInt(adminId)
    const parsedRequestId = Number.parseInt(requestId)

    if (Number.isNaN(parsedAdminId) || Number.isNaN(parsedRequestId)) {
      throw error(400, "Invalid request")
    }

    const placeRequest = await db.request.findUnique({
      where: { id: parsedRequestId },
      select: {
        requestStatus: true,
        facility: true,
        equipment: true,
        requestDates: true,
        id: true,
      },
    })

    if (!placeRequest || !placeRequest.requestStatus) {
      throw error(400, "Invalid request")
    }

    if (!placeRequest.equipment && !placeRequest.facility) {
      throw error(400, "Invalid request")
    }

    let adminStatus = placeRequest?.requestStatus.find(
      status => status.adminId === parsedAdminId
    )
    if (!adminStatus) {
      throw error(400, "Invalid request")
    }
    adminStatus.requestStatus = "REJECTED"

    await db.request.update({
      where: { id: parsedRequestId },
      data: {
        requestStatus: placeRequest?.requestStatus,
      },
    })
  },
} satisfies Actions
