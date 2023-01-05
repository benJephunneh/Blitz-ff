import { resolver } from "@blitzjs/rpc"
import db from "db"
import { LineItemSkeleton, notes, UpdateLineItem } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateLineItem),
  resolver.authorize(),

  async ({ id, notes, ...values }) => {
    const lineItem = await db.lineItem.update({
      where: { id },
      data: {
        notes,
        ...values,
      },
    })

    return lineItem
  }
)
