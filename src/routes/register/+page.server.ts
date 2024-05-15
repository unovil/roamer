import db from "$lib/prisma"
import type { Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { lucia } from "$lib/server/auth"
import { Argon2id } from "oslo/password"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import path, { extname } from "path"
import { writeFile } from "node:fs/promises"
import Jimp from "jimp"

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    redirect(302, "/dashboard")
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formInfo = Object.fromEntries(await request.formData())
    const { email, firstName, lastName, password, pfp } = formInfo as {
      email: string
      firstName: string
      lastName: string
      password: string
      pfp: File
    }

    let filePath = ""

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      return fail(400, {
        invalidEmail: true,
        error: "Invalid email address."
      })
    }

    if (!firstName || firstName.trim().length == 0) {
      return fail(400, {
        invalidFirstName: true,
        error: "First name should not be empty."
      })
    }

    if (!lastName || lastName.trim().length == 0) {
      return fail(400, {
        invalidLastName: true,
        error: "Last name should not be empty."
      })
    }

    if (!password || password.length < 8 || password.length > 32) {
      return fail(400, {
        invalidPass: true,
        error: "Password must be between 8 and 32 characters."
      })
    }

    if (!(!pfp.name || pfp.name === "undefined" || !pfp.size)) {
      filePath = path.join(
        "uploads",
        `pfp-${crypto.randomUUID()}${extname(pfp.name)}`
      )

      const value = await Jimp.read(Buffer.from(await pfp.arrayBuffer()))

      // Calculate scale factor
      const scaleFactor = Math.max(
        1024 / value.bitmap.width,
        1024 / value.bitmap.height
      )

      // Resize the image
      value.scale(scaleFactor)

      // Calculate the coordinates for cropping
      const x = value.bitmap.width / 2 - 512
      const y = value.bitmap.height / 2 - 512

      // Crop the image
      await value
        .crop(x, y, 1024, 1024)
        .quality(70)
        .writeAsync(path.join("static", filePath))
    }

    const hashedPassword = await new Argon2id().hash(password)

    try {
      // Create the user in the database
      const response = await db.user.create({
        data: {
          email: email.trim().toLowerCase() as string,
          firstName: firstName.trim() as string,
          lastName: lastName.trim() as string,
          hashedPassword: hashedPassword as string,
          pfp: filePath
        }
      })

      const session = await lucia.createSession(response.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      })
    } catch (err) {
      console.log(err)
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002" // unique constraint
      ) {
        return fail(400, {
          duplicateUser: true,
          error:
            "A user with this email address was already found. Try with a different email."
        })
      } else throw err
    }

    redirect(302, "/dashboard")
  }
} satisfies Actions
