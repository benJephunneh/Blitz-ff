import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { GetJobsSchema } from "../validations"

interface GetJobsInput extends Pick<Prisma.JobFindManyArgs, "where" | "include" | "orderBy"> {}

export default resolver.pipe(
  resolver.authorize(),
  // resolver.zod(GetJobsSchema),

  async ({ where, orderBy }: GetJobsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const jobs = await db.job.findMany({
      where,
      orderBy,
      include: {
        lineitems: true,
      },
    })

    return jobs
  }
)
