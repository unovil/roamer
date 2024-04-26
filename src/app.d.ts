// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: import("lucia").User | null
      session: import("lucia").Session | null
    }

    interface PageData {
      user?: User
    }
    // interface PageState {}
    // interface Platform {}
  }

  namespace PrismaJson {
    type RequestStatus = "APPROVED" | "WAITING" | "REJECTED"

    type Departments = {
      departments: Array<import("@prisma/client").Department>?
    }
    type RangeDates = { start: Date; end: Date }[]
    type RequestStatuses = {
      adminId: import("@prisma/client").Admin["id"]
      requestStatus: RequestStatus
      reason: string
    }[]
  }
}

export {}
