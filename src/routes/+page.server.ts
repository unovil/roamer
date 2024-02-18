import db from '$lib/prisma'
import type { Prisma, User } from '@prisma/client'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {

    const getUsers = async () => {
        const users = await db.user.findMany()
        return users
    }

    const users = await getUsers() satisfies User[]

    return { users }
};