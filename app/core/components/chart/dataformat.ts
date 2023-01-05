import { useQuery } from "@chakra-ui/react"
import { Job } from "@prisma/client"
import { Range } from "app/jobs/components/JobPanel"
import getJobs from "app/jobs/queries/getJobs"
import { getMonth } from "date-fns"
import db from "db"

type dataformatProps = {
  // jobs: Job[]
  range: Range
}
const dataformat = async ({ range }: dataformatProps) => {
  const jobs = await db.job.findMany({
    where: {
      AND: [
        { start: { gte: range![0] }},
        { end: {lte: range![1] }},
      ]
    }
  })

  const data = jobs.reduce((acc, job) => {
    const name = getMo

    const start =
  })

  // const data = {
  //   name:
  //   start:
  //   end:
  // }
  return {

  }
}

export default dataformat
