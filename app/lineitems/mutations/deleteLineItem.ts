import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteLineItem } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteLineItem),
  resolver.authorize(),

  async ({ id }) => {
    await db.lineItem.delete({ where: { id } })

    return
  }
)
