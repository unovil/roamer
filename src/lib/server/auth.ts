import { Lucia } from "lucia"
import { dev } from "$app/environment"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import db from "$lib/prisma"

import {
  Prisma,
  UserRole,
  type School,
  type Admin,
  type Student,
} from "@prisma/client"

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: attributes => {
    return {
      // attributes has the type of DatabaseUserAttributes
      ...attributes,
    }
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  school: School | null
  admin: Admin | null
  student: Student | null
  schoolId: number | null
}
