import { resolver } from "@blitzjs/rpc"
import db from "db"
import { FindLineItem } from "../validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindLineItem),

  async ({ query }) => {
    if (!query) return []

    const search = query.split(" ").join(" | ")
    const lineItems = await db.lineItem.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { name: { search, mode: "insensitive" } },
        ],
      },
    })

    return lineItems
  }
)
