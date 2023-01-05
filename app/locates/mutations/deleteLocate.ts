import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteLocate } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteLocate),
  resolver.authorize(),

  async ({ id }) => {
    await db.locate.delete({ where: { id } })
  }
)
