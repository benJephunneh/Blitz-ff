import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateJob = z.object({
  title: z.string(),
  start: z.date().optional(),
  end: z.date().optional(),
  locationId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateJob), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const job = await db.job.create({ data: input })
  await db.jobArchive.create({ data: input })

  return job
})
