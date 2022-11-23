import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLineItem, LineItemSkeleton } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateLineItem),
  resolver.authorize(),

  async (input) => {
    let { cost, ...data } = input
    const price = Number(cost)
    const lineItem = await db.lineItem.create({
      data: {
        cost: price,
        ...data,
      },
    })

    return lineItem
  }
)
