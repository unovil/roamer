import { PrismaClient, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Argon2id } from "oslo/password";
import type { Departments } from "../src/app"

const db = new PrismaClient()
const repeats = 5;
const role: "ADMIN" | "STUDENT" | null = UserRole.ADMIN

function getWeightedUserRole() {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Return 'ADMIN' 10% of the time and 'STUDENT' 90% of the time
    return randomNumber < 0.1 ? UserRole.ADMIN : UserRole.STUDENT;
}

for (let i = 0; i < repeats; i++) {
    const userResponse = await db.user.create({
        data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            role: role ? role : getWeightedUserRole(),
            email: faker.internet.email(),
            hashedPassword: await new Argon2id().hash("baba black sheep"),
            schoolId: 1
        },
        include: {
            school: true
        }
    })
    
    if (userResponse.role == "STUDENT") {
        const studentResponse = await db.student.create({
            data: {
                lrn: faker.string.numeric(12),
                userId: userResponse.id,
                sectionId: faker.number.int({ min: 1, max: 8 })
            }
        })
    } else if (userResponse.role == "ADMIN") {
        const adminResponse = await db.admin.create({
            data: {
                userId: userResponse.id,
                departments: {} as Departments
            }
        })
    }    
}