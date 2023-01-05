import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteTask } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteTask),
  resolver.authorize(),

  async ({ id }) => {
    await db.task.delete({ where: { id } })
  }
)
