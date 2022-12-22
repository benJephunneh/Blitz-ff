import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateJob } from "../validations"

// const CreateJob = z.object({
//   title: z.string(),
//   start: z.date().optional(),
//   end: z.date().optional(),
//   locationId: z.number(),
// })

// const CreateJob = JobSkeleton.extend({ locationId, notes: notes.nullable() })

export default resolver.pipe(
  resolver.zod(CreateJob),
  resolver.authorize(),

  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { lineitems, start, end, ...data } = input

    let lineitemIds: { id: number }[] = [...(lineitems?.map(({ id }) => ({ id })) ?? [])]
    // if (Array.isArray(lineitems))
    //   lineitemIds = [
    //     ...lineitems?.map(({ id }) => ({
    //       id,
    //     })),
    //   ]

    const job = await db.job.create({
      data: {
        // locationId,
        // notes: JSON.stringify(notes),
        userId: ctx.session.userId,
        lineitems: { connect: [...lineitemIds] },
        start: start ? new Date(start) : null,
        end: end ? new Date(end) : null,
        ...data,
      },
    })
    await db.jobArchive.create({
      data: {
        lineitems: { connect: [...lineitemIds] },
        start: start ? new Date(start) : null,
        end: end ? new Date(end) : null,
        ...data,
      },
    })

    // if (job) {
    //   // Create invoice
    //   await db.invoice.create({
    //     data: {
    //       title: `${job.id}: ${job.title} c:${job.customerId} l:${job.locationId}`,
    //       jobId: job.id,
    //       userId: ctx.session.userId,
    //       lineItems: job.lineItems,
    //     },
    //   })
    // }

    return job
  }
)
