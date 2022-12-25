import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { UpdateJob } from "../validations"

// const UpdateJob = z.object({
//   id: z.number(),
//   title: z.string(),
//   start: z.date().optional(),
//   end: z.date().optional(),
//   locationId: z.number(),
// })

export default resolver.pipe(
  resolver.zod(UpdateJob),
  resolver.authorize(),
  async ({ id, ...input }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { lineitems, ...data } = input
    const lineitemIds: { id: number }[] = [...(lineitems?.map(({ id }) => ({ id })) ?? [])]
    const j = await db.job.findFirst({ where: { id } })

    // if (j) console.log({ j })
    // else console.log("not found")
    // return j

    const job = await db.job.update({
      where: { id },
      data: {
        lineitems: {
          connect: [...lineitemIds],
        },
        ...data,
      },
    })
    await db.jobArchive.update({
      where: { id },
      data: {
        lineitems: {
          connect: [...lineitemIds],
        },
        ...data,
      },
    })

    return job
  }
)
