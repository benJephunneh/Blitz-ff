import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

interface GetJobProps extends Pick<Prisma.JobFindFirstArgs, "where"> {
  id?: number
}
const GetJob = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  // resolver.zod(GetJob),
  resolver.authorize(),

  async ({ where }: GetJobProps) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const job = await db.job.findFirst({
      where,
      include: {
        lineitems: true,
      },
    })

    // if (!job) throw new NotFoundError();

    return job
  }
)
