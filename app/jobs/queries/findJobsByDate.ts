import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const dateSchema = z.preprocess((d) => {
  if (typeof d == "string" || d instanceof Date) return new Date(d)
}, z.date())
// type dateSchema = z.infer<typeof datePreProcess>

const FindJobsSchema = z.object({
  query: dateSchema,
})
type FindJobsProps = {
  query: Date
}

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FindJobsSchema),

  async ({ query }) => {
    if (!query) return []

    const start = new Date(query.getFullYear(), query.getMonth(), query.getDate())
    console.log(`findJobsByDate: ${start}`)

    const jobs = await db.job.findMany({
      where: {
        OR: [
          { start: { equals: start } }, // starts today, or
          { end: { equals: start } }, // ends today, or
          { AND: [{ start: { lt: start } }, { end: { gt: start } }] }, // started before today and ends after today
        ],
      },
    })

    return jobs
  }
)
