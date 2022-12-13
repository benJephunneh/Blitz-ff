import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Signup } from "../validations"

export default resolver.pipe(
  resolver.zod(Signup),

  async ({ username, email, password, role }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    const user = await db.user.create({
      data: { username, email, hashedPassword, role },
      select: { id: true, username: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role })
    return user
  }
)
