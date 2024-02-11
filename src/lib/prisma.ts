import { PrismaClient } from '@prisma/client'

// expose a singleton
const db = new PrismaClient()
export default db