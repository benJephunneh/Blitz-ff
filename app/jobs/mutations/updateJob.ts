import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateJob = z.object({
  id: z.number(),
  title: z.string(),
  start: z.date().optional(),
  end: z.date().optional(),
  locationId: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateJob),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const job = await db.job.update({ where: { id }, data })
    await db.jobArchive.update({ where: { id }, data })

    return job
  }
)
