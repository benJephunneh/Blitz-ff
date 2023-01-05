import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLocate } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateLocate),
  resolver.authorize(),

  async (data) => {
    return await db.locate.create({ data })
  }
)
