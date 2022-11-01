import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetJobsInput
  extends Pick<Prisma.JobFindManyArgs, "where" | "include" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy }: GetJobsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const jobs = await db.job.findMany({
    where,
    orderBy,
  })

  return jobs
})
