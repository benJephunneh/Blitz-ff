import { resolver } from "@blitzjs/rpc"
import { getWeek, startOfWeek, addDays, subDays, isMonday } from "date-fns"
import db, { Prisma } from "db"
import { z } from "zod"
import { Range } from "../components/JobPanel"

// const dateSchema = z.preprocess((d) => {
//   if (typeof d == "string" || d instanceof Date) return new Date(d)
// }, z.date())
// type dateSchema = z.infer<typeof datePreProcess>

// const FindJobsSchema = z.object({
//   query: dateSchema,
// })
interface FindJobsProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  // range?: Range
  weekNumber: number
}

export default resolver.pipe(
  resolver.authorize(),
  // resolver.zod(FindJobsSchema),

  async ({ weekNumber, orderBy }: FindJobsProps) => {
    const currentWeek = getWeek(new Date())
    const dayDifference = (currentWeek - (weekNumber + 1)) * 7
    const start = startOfWeek(subDays(new Date(), dayDifference), { weekStartsOn: 1 }) // Monday
    const end = addDays(start, 4) // Friday
    // console.log(`Monday?: ${isMonday(start)}`)
    // console.log({ start })
    // console.log({ end })
    // console.log({ currentWeek })
    // console.log(`weeksToDays: ${weeksToDays(w)}`)
    // console.table([{ Monday: monday, Friday: friday }])

    // if (!range || !Array.isArray(range) || range.some((d) => d == null)) return []

    // console.log(`findJobsByWeek: ${range}`)
    // const start = range.at(0)!
    // const end = range.at(1)!

    const jobs = await db.job.findMany({
      where: {
        AND: [
          { end: { gte: start } }, // Ends on or afer M
          { start: { lte: end } }, // Starts on or before F
        ],
      },
      orderBy: { start: "asc" },
    })

    return jobs
  }
)
