import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteStash = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteStash), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const stash = await db.stash.deleteMany({ where: { id } })

  return stash
})
