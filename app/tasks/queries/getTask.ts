import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"

interface GetTaskProps extends Pick<Prisma.TaskFindFirstArgs, "where" | "include" | "select"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where }: GetTaskProps) => {
    return await db.task.findFirst({ where })
  }
)
