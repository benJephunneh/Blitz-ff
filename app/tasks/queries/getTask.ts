import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"
import { CreateTask } from "../validations"

interface TaskFindFirstArgs
  extends Pick<Prisma.TaskFindFirstArgs, "where" | "include" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where, select }: TaskFindFirstArgs) => {
    return await db.task.findFirst({ where, select })
  }
)
