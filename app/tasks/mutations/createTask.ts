import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTask } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateTask),
  resolver.authorize(),

  async (data) => {
    return await db.task.create({ data })
  }
)
