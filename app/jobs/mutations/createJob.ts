import { resolver } from "@blitzjs/rpc"
import db from "db"
import { BsCartX } from "react-icons/bs"
import { z } from "zod"

const CreateJob = z.object({
  title: z.string(),
  start: z.date().optional(),
  end: z.date().optional(),
  locationId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateJob), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const job = await db.job.create({
    data: {
      userId: ctx.session.userId,
      ...input,
    },
  })
  await db.jobArchive.create({ data: input })

  return job
})
