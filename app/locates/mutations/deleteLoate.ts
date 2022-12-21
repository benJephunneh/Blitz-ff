import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteLocate } from "../validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(DeleteLocate),

  async ({ id }) => {
    const locate = await db.locate.delete({ where: { id } })

    return locate
  }
)
