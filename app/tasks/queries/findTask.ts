import { resolver } from "@blitzjs/rpc"
import db from "db"
import { FindTask } from "../validations"

export default resolver.pipe(
  resolver.zod(FindTask),
  resolver.authorize(),

  async ({ query }) => {
    if (!query) return []
    const search = query.trim().split(" ").join(" | ")

    const task = await db.task.findFirst({
      where: {
        OR: [{ title: { search, mode: "insensitive" } }],
      },
    })

    return task
  }
)
