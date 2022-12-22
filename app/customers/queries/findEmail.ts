import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { email } from "../validations"

const FindEmail = z.object({
  query: z.string(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindEmail),

  async ({ query }) => {
    if (!query) return []

    const search = query.split(" ").join(" | ")

    const email = await db.customer.findFirst({
      where: {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      select: {
        email: true,
      },
    })

    return email
  }
)
