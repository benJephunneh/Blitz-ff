import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateLocate } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateLocate),
  resolver.authorize(),

  async ({ id, ...data }) => {
    return await db.locate.update({
      where: { id },
      data,
    })
  }
)
