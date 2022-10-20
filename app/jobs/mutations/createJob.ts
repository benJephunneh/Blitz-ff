import { resolver } from "@blitzjs/rpc"
import db from "db"
import { BsCartX } from "react-icons/bs"
import { z } from "zod"
import { JobSkeleton, locationId, notes } from "../validations"

// const CreateJob = z.object({
//   title: z.string(),
//   start: z.date().optional(),
//   end: z.date().optional(),
//   locationId: z.number(),
// })

const CreateJob = JobSkeleton.extend({ locationId, notes: notes.nullable() })

export default resolver.pipe(
  resolver.zod(CreateJob),
  resolver.authorize(),
  async ({ locationId, notes, ...values }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const job = await db.job.create({
      data: {
        locationId,
        notes: JSON.stringify(notes),
        userId: ctx.session.userId,
        ...values,
      },
    })
    await db.jobArchive.create({
      data: {
        locationId,
        notes: JSON.stringify(notes),
        ...values,
      },
    })

    return job
  }
)
