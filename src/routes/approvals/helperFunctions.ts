export type ItemType = {
  placeType: string
  place: {
    id: number
    name: string
    image: string
    blockedDates: PrismaJson.RangeDates
  }
  requestId: number
  adminsStatus: {
    name: string
    id: number
    status: PrismaJson.RequestStatus,
    reason: string
  }[]
  students: {
    name: string
    section: string
    id: number
  }[]
  requestDates: PrismaJson.RangeDates
  description: string
}

export const overallStatusChecker = (item: ItemType) => {
  if (item.adminsStatus.every((status) => status.status === "REJECTED")) {
    return {class: "font-medium text-red-600", text: "DENIED"}
  }

  if (item.adminsStatus.every((status) => status.status === "APPROVED")) {
    return {class: "font-medium text-green-600", text: "APPROVED"}
  }
  
  return {class: "font-medium text-yellow-600", text: "WAITING"}
}

export const statusChecker = (adminStatus: ItemType["adminsStatus"][0]) => {
  let reason: string = adminStatus.reason
  if (!adminStatus.reason || reason === "") {
    reason = "[No reason was given.]"
  }

  if (adminStatus.status === "REJECTED") {
    return {class: "font-medium text-red-600", text: "DENIED", reason}
  }

  if (adminStatus.status === "APPROVED") {
    return {class: "font-medium text-green-600", text: "APPROVED", reason}
  }

  reason = "Reason to be given."  
  return {class: "font-medium text-yellow-600", text: "WAITING", reason}
}