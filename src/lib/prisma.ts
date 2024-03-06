import { Prisma, PrismaClient, UserRole } from '@prisma/client'
import { Department, type Admin, type Facility } from '@prisma/client'

// expose a singleton
const db = new PrismaClient()
/*  .$extends({
        query: {
            user: {
                async create({ args, query }) {
                    if (args.data.role == UserRole.ADMIN) {
                        db.$transaction([
                            db.user.create({ ...args }),
                            db.admin.create({
                                data: {
                                    User: { connect: { id: args.data.id } },
                                    departments: { departments: new Array<Department> }
                                }
                            })
                        ])
                    } else if (args.data.role == UserRole.STUDENT) {
                        db.$transaction([
                            db.user.create({ ...args }),
                            db.student.create({
                                data: {
                                    User: { connect: { id: args.data.id } },
                                    lrn: "keepaway",
                                    Section: { connectOrCreate: { where: { school: args.data.school }}}}
                                })
                            ])
                        }
                        return query(args)
                    }
                }
            }
        }
    )  
    */

export default db

