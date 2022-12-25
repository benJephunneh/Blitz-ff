import { resolver } from "@blitzjs/rpc"
import { addDays } from "date-fns"
import db, { Prisma } from "db"
import { z } from "zod"

const dateSchema = z.preprocess((d) => {
  if (typeof d == "string" || d instanceof Date) return new Date(d)
}, z.date())
// type dateSchema = z.infer<typeof datePreProcess>

const FindJobsSchema = z.object({
  query: dateSchema,
})
interface FindJobsProps extends Pick<Prisma.JobStashFindManyArgs, "orderBy"> {
  query: Date
}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindJobsSchema),

  async ({ query, orderBy }: FindJobsProps) => {
    if (!query) return []

    const start = new Date(query.getFullYear(), query.getMonth(), query.getDate())
    const end = addDays(start, 1)
    console.log(`findjobs start: ${start}`)

    const jobs = await db.job.findMany({
      where: { start },
      orderBy,
    })

    return jobs
  }
)
