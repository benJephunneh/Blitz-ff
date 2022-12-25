import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteJob = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteJob), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const job = await db.job.deleteMany({ where: { id } })

  return job
})
