import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateLocate } from "../validations"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateLocate),

  async ({ id, ...data }) => {
    const locate = await db.locate.update({
      where: { id },
      data,
    })

    return locate
  }
)
