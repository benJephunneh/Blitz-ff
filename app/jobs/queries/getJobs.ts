import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { GetJobsSchema } from "../validations"

interface GetJobsInput extends Pick<Prisma.JobFindManyArgs, "where" | "include" | "orderBy"> {}

export default resolver.pipe(
  resolver.zod(GetJobsSchema),
  resolver.authorize(),

  async ({ customerId, locationId, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const jobs = await db.job.findMany({
      where: { customerId, locationId },
      include: {
        lineitems: true,
      },
      orderBy: [{ start: "asc" }, { end: "asc" }, { createdAt: "asc" }],
    })

    // console.table(jobs)
    return jobs
  }
)
