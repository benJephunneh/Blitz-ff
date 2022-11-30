import { Job } from "@prisma/client"
import { getHours, getMinutes } from "date-fns"

export interface IFinalJobsByHour {
  jobs: Job[][]
  starts: number[]
  stops: number[]
}

const jobsByHour = (jobs: Job[]) => {
  // console.log({ jobs })
  // console.log('filtered jobs', jobs.filter(j => getHours(j.start!) == 9).length)
  const startArray: Job[][] = [
    jobs.filter((j) => getHours(j.start!) == 9),
    jobs.filter((j) => getHours(j.start!) == 9 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 10),
    jobs.filter((j) => getHours(j.start!) == 10 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 11),
    jobs.filter((j) => getHours(j.start!) == 11 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 12),
    jobs.filter((j) => getHours(j.start!) == 12 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 13),
    jobs.filter((j) => getHours(j.start!) == 13 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 14),
    jobs.filter((j) => getHours(j.start!) == 15 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 15),
    jobs.filter((j) => getHours(j.start!) == 15 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.start!) == 16),
    jobs.filter((j) => getHours(j.start!) == 16 && getMinutes(j.start!) == 30),
    [],
  ]

  // const startArrayLengths = [...startArray.map((arr) => arr.length)]

  console.log("startArray", startArray)
  // console.log("startArrayLengths", startArrayLengths)

  const endArray: Job[][] = [
    [],
    jobs.filter((j) => getHours(j.start!) == 9 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 10),
    jobs.filter((j) => getHours(j.start!) == 10 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 11),
    jobs.filter((j) => getHours(j.start!) == 11 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 12),
    jobs.filter((j) => getHours(j.start!) == 12 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 13),
    jobs.filter((j) => getHours(j.start!) == 13 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 14),
    jobs.filter((j) => getHours(j.start!) == 14 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 15),
    jobs.filter((j) => getHours(j.start!) == 15 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 16),
    jobs.filter((j) => getHours(j.start!) == 16 && getMinutes(j.start!) == 30),
    jobs.filter((j) => getHours(j.end!) == 17),
  ]

  let finalArray: IFinalJobsByHour
  let start: number
  let stop: number = 0
  let jobsCombined: Job[][] = []
  let starts: number[] = []
  let stops: number[] = []

  for (var ii = 0; ii < startArray.length; ii++) {
    const jobsRow = [...(startArray.at(ii) ?? []), ...(endArray.at(ii) ?? [])]
    jobsCombined.push(jobsRow)
    const length = jobsRow.length
    start = ii === 0 ? 0 : stop
    stop = Math.max(stop + 1, start + length)
    starts.push(start)
    stops.push(stop)

    // finalArray.push({
    //   jobs,
    //   length: jobs.length,
    //   start,
    //   stop,
    // })
  }

  finalArray = {
    jobs: jobsCombined,
    starts,
    stops,
  }

  console.log(jobsCombined, starts, stops)

  return finalArray
}

export default jobsByHour
