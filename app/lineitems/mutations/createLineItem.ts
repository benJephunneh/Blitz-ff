import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLineItem, LineItemSkeleton } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateLineItem),
  resolver.authorize(),

  async ({ notes, ...input }) => {
    const lineItem = await db.lineItem.create({
      data: {
        notes: JSON.stringify(notes),
        ...input,
      },
    })

    return lineItem
  }
)
