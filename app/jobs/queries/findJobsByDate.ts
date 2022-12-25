import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { z } from "zod"

const dateSchema = z.preprocess((d) => {
  if (typeof d == "string" || d instanceof Date) return new Date(d)
}, z.date())
// type dateSchema = z.infer<typeof datePreProcess>

const FindJobsSchema = z.object({
  date: dateSchema,
})
interface FindJobsProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  date: Date
}

export default resolver.pipe(
  resolver.authorize(),
  // resolver.zod(FindJobsSchema),

  async ({ date, orderBy }: FindJobsProps) => {
    if (!date) return []

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    console.log(`findJobsByDate: ${start}`)

    const jobs = await db.job.findMany({
      where: {
        OR: [
          { start: { equals: start } }, // starts today, or
          { end: { equals: start } }, // ends today, or
          { AND: [{ end: { gte: start } }, { start: { lte: start } }] }, // started before today and ends after today
        ],
      },
      orderBy,
    })

    return jobs
  }
)
