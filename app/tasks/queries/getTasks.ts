import { resolver } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import db from "db"

export default resolver.pipe(
  resolver.authorize(),

  async () => {
    return await db.task.findMany({})
  }
)
