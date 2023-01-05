import { resolver } from "@blitzjs/rpc"
import db from "db"
import { FindLocate } from "../validations"

export default resolver.pipe(
  resolver.zod(FindLocate),
  resolver.authorize(),

  async ({ query }) => {
    if (!query) return []

    const search = query.trim().split(" ").join(" | ")
    const locates = await db.locate.findMany({
      where: {
        OR: [{ title: { search } }],
      },
    })

    return locates
  }
)
