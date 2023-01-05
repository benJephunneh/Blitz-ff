import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTask } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateTask),
  resolver.authorize(),

  async ({ id, ...data }) => {
    return await db.task.update({
      where: { id },
      data,
    })
  }
)
