import { resolver } from "@blitzjs/rpc"
import db from "db"
import { defaultValueSchemable } from "sequelize/types/utils"
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

    const start = new Date(query.getMonth())
    console.log(JSON.stringify(`findjobs start: ${start}`))

    const jobs = await db.job.findMany({
      where: { start },
    })

    return jobs
  }
)
