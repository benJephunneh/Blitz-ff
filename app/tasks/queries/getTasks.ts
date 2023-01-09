import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"

interface GetTasksProps extends Pick<Prisma.TaskFindManyArgs, "where"> {}

export default resolver.pipe(
  resolver.authorize(),

  async ({ where }: GetTasksProps) => {
    return await db.task.findMany({
      where,
    })
  }
)
