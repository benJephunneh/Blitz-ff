import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateLocate } from "../validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateLocate),

  async (data) => {
    const locate = await db.locate.create({ data })

    return locate
  }
)
