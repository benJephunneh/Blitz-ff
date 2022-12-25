import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateLineItem } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateLineItem),
  resolver.authorize(),

  async ({ id, ...data }) => {
    const lineItem = db.lineItem.update({
      where: { id },
      data,
    })

    return lineItem
  }
)
