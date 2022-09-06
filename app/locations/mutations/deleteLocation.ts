import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteLocation = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteLocation),
  resolver.authorize(["Admin", "Owner"]),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const location = await db.location.deleteMany({ where: { id } })

    return location
  }
)
