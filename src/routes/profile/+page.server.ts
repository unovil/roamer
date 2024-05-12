import { error, fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import db from "$lib/prisma"
import { Argon2id } from "oslo/password"
import Jimp from "jimp"
import path, { extname } from "path"
import { unlink } from "node:fs/promises"
import { existsSync } from "fs"

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    redirect(302, "/login")
  }

  const user = db.user.findUnique({
    where: { id: event.locals.user.id },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      pfp: true,
      role: true
    }
  })

  if (!user) {
    redirect(302, "/login")
  }

  return user
}

export const actions = {
  changePassword: async ({ request, locals }) => {
    const formInfo = Object.fromEntries(await request.formData())
    const { currentPassword, newPassword } = formInfo as {
      currentPassword: string
      newPassword: string
    }

    if (!newPassword || newPassword.length < 8 || newPassword.length > 32) {
      return fail(400, {
        type: "password",
        invalidPass: true,
        error: "The password must be between 8 and 32 characters long."
      })
    }

    const user = await db.user.findUnique({
      select: { hashedPassword: true },
      where: { id: locals.user?.id }
    })

    if (!user) {
      throw error(400, "Invalid request")
    }

    const isValidPassword = await new Argon2id().verify(
      user.hashedPassword,
      currentPassword
    )

    if (!isValidPassword) {
      return fail(400, {
        type: "password",
        invalidCurrentPass: true,
        error: "Your current password is incorrect."
      })
    }

    const hashedPassword = await new Argon2id().hash(newPassword)

    await db.user.update({
      where: { id: locals.user?.id },
      data: { hashedPassword }
    })
  },
  changeEmail: async ({ request, locals }) => {
    const formInfo = Object.fromEntries(await request.formData())
    const { newEmail } = formInfo as { newEmail: string }

    if (!newEmail || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(newEmail)) {
      return fail(400, {
        type: "email",
        invalidEmail: true,
        error: "Invalid email address."
      })
    }

    const user = await db.user.findUnique({
      select: { email: true },
      where: { id: locals.user?.id }
    })

    if (!user) {
      throw error(400, "Invalid request")
    }

    if (user.email === newEmail) {
      return fail(400, {
        type: "email",
        sameEmail: true,
        error: "You are already using this email address."
      })
    }

    await db.user.update({
      where: { id: locals.user?.id },
      data: { email: newEmail }
    })
  },
  changePfp: async ({ request, locals }) => {
    const formInfo = Object.fromEntries(await request.formData())
    const { newPfp } = formInfo as { newPfp: File }

    if (!newPfp.name || newPfp.name === "undefined" || !newPfp.size) {
      return fail(400, {
        type: "pfp",
        noFile: true,
        error: "Please select a file to upload."
      })
    }

    const user = await db.user.findUnique({
      select: { pfp: true },
      where: { id: locals.user?.id }
    })

    if (!user) {
      throw error(400, "Invalid request")
    }

    const newFilePath = path.join(
      "uploads",
      `pfp-${crypto.randomUUID()}${extname(newPfp.name)}`
    )

    const value = await Jimp.read(Buffer.from(await newPfp.arrayBuffer()))

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
      .writeAsync(path.join("static", newFilePath))

    if (user.pfp !== "" && existsSync(path.join("static", user.pfp))) {
      await unlink(path.join("static", user.pfp))
    }

    await db.user.update({
      where: { id: locals.user?.id },
      data: { pfp: newFilePath }
    })
  }
} satisfies Actions
