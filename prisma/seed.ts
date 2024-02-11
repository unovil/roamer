import { Prisma, Role } from '@prisma/client'
import db from '../src/lib/prisma'
import { faker } from '@faker-js/faker'

const createRandomUser = () => {
    return {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        role: faker.helpers.arrayElement([Role.ADMIN, Role.USER])
    }
}

function getUsers() {
    return Array.from({ length: 100 }, createRandomUser)
}

async function seed() {
    await Promise.all(
        getUsers().map((user) => {
            return db.user.create({ data: user })
        })
    )
}

seed()