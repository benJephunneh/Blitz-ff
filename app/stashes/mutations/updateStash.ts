import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateStash = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateStash),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const stash = await db.stash.update({ where: { id }, data })

    return stash
  }
)
