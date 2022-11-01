import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { Range } from "../components/JobPanel"

// const dateSchema = z.preprocess((d) => {
//   if (typeof d == "string" || d instanceof Date) return new Date(d)
// }, z.date())
// type dateSchema = z.infer<typeof datePreProcess>

// const FindJobsSchema = z.object({
//   query: dateSchema,
// })
type FindJobsProps = {
  range?: Range
}

export default resolver.pipe(
  resolver.authorize(),
  // resolver.zod(FindJobsSchema),

  async ({ range }: FindJobsProps) => {
    if (!range || !Array.isArray(range) || range.some((d) => d == null)) return []

    console.log(`findJobsByWeek: ${range}`)
    const start = range.at(0)!
    const end = range.at(1)!

    const jobs = await db.job.findMany({
      where: {
        AND: [
          { OR: [{ start: { gte: start } }, { end: { gte: start } }] }, // Starts or ends on Monday
          { OR: [{ end: { lte: end } }, { end: { lte: end } }] }, // Starts or ends on Friday
        ],
      },
    })

    return jobs
  }
)
