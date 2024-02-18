import { Prisma, StudentRole, Students, Sections } from '@prisma/client'
import { sections } from './seedSample.json'
import db from '../src/lib/prisma'
import { faker } from '@faker-js/faker'

const createSampleSections = () => {
    return sections satisfies Prisma.SectionsCreateInput[]
}

const createRandomUser = () => {
    return {
        lrn: faker.string.numeric({ length: 12, allowLeadingZeros: false }),
        email: faker.internet.email(),
        firstName: faker.internet.userName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        role: faker.helpers.arrayElement([StudentRole.PRESIDENT, StudentRole.REGULAR]),
        sections: faker.helpers.uniqueArray()
    } satisfies Prisma.StudentsCreateInput
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