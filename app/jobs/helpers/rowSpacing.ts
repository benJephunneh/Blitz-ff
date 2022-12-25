import { Job } from "@prisma/client"
import { getDay, getHours, getMinutes } from "date-fns"

const rowSpacing = (jobs: Job[]) => {
  // Create row spacing for each half-hour in the calendar for a given week.

  let rowStarts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] // Maximum number of starts/ends of jobs there are for a given half-hour in that week.
  let rowEnds = [...rowStarts.map((e) => e + 1)] // ... stops ....
  // for (var aa = 0; aa < rowStarts.length; aa++) {
  //   rowStarts[aa] = aa
  //   rowEnds[aa] = rowStarts[aa] + 1
  // }

  for (var ii = 1; ii <= 5; ii++) {
    for (var jj = 0; jj < jobs.length; jj++) {
      const tempJobs = jobs.filter((j) => getDay(j.start!) == ii || getDay(j.end!) == ii) // Monday's jobs, then Tuesday's, etc.

      // for (var hh = 0; hh < 17; hh++) {
      const j9 = tempJobs.filter((j) => getHours(j.start!) == 9).length // Monday's jobs starting at 0900, then Tuesday's, etc.
      // Row 0 start is always === 0:
      if (rowEnds[0]! < j9) {
        // rowEnds[0]! = j9
        // rowStarts[1]! = rowEnds[0]!
        rowEnds = [...rowEnds.map((e) => e + j9 - 1)]
        rowStarts = [...rowStarts.map((e) => e + j9 - 1)]
        rowStarts[0] = 0
        // console.log({ j9 })
        // console.log("rowStarts", rowStarts)
        // console.log("rowEnds", rowEnds)
      }

      const j930 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 9 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 9 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[1]! - rowStarts[1]! < j930) {
        rowEnds[1]! = rowStarts[1]! + j930
        rowStarts[2]! = rowEnds[1]!
      }

      const j10 = tempJobs.filter((j) => getHours(j.start!) == 10 || getHours(j.end!) == 10).length
      if (rowEnds[2]! - rowStarts[2]! < j10) {
        rowEnds[2]! = rowStarts[2]! + j10
        rowStarts[3]! = rowEnds[2]!
      }

      const j1030 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 10 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 10 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[3]! - rowStarts[3]! < j1030) {
        rowEnds[3]! = rowStarts[3]! + j1030
        rowStarts[4]! = rowEnds[3]!
      }

      const j11 = tempJobs.filter((j) => getHours(j.start!) == 11 || getHours(j.end!) == 11).length
      if (rowEnds[4]! - rowStarts[4]! < j11) {
        rowEnds[4]! = rowStarts[4]! + j11
        rowStarts[5]! = rowEnds[4]!
      }

      const j1130 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 11 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 11 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[5]! - rowStarts[5]! < j1130) {
        rowEnds[5]! = rowStarts[5]! + j1130
        rowStarts[6]! = rowEnds[5]!
      }

      const j12 = tempJobs.filter((j) => getHours(j.start!) == 12 || getHours(j.end!) == 12).length
      if (rowEnds[6]! - rowStarts[6]! < j12) {
        rowEnds[6]! = rowStarts[6]! + j12
        rowStarts[7]! = rowEnds[6]!
      }

      const j1230 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 12 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 12 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[7]! - rowStarts[7]! < j1230) {
        rowEnds[7]! = rowStarts[7]! + j1230
        rowStarts[8]! = rowEnds[7]!
      }

      const j13 = tempJobs.filter((j) => getHours(j.start!) == 13 || getHours(j.end!) == 13).length
      if (rowEnds[8]! - rowStarts[8]! < j13) {
        rowEnds[8]! = rowStarts[8]! + j13
        rowStarts[9]! = rowEnds[8]!
      }

      const j1330 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 13 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 13 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[9]! - rowStarts[9]! < j1330) {
        rowEnds[9]! = rowStarts[9]! + j1330
        rowStarts[10]! = rowEnds[9]!
      }

      const j14 = tempJobs.filter((j) => getHours(j.start!) == 14 || getHours(j.end!) == 14).length
      if (rowEnds[10]! - rowStarts[10]! < j14) {
        rowEnds[10]! = rowStarts[10]! + j14
        rowStarts[11]! = rowEnds[10]!
      }

      const j1430 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 14 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 14 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[11]! - rowStarts[11]! < j1430) {
        rowEnds[11]! = rowStarts[11]! + j1430
        rowStarts[12]! = rowEnds[11]!
      }

      const j15 = tempJobs.filter((j) => getHours(j.start!) == 15 || getHours(j.end!) == 15).length
      if (rowEnds[12]! - rowStarts[12]! < j15) {
        rowEnds[12]! = rowStarts[12]! + j15
        rowStarts[13]! = rowEnds[12]!
      }

      const j1530 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 15 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 15 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[13]! - rowStarts[13]! < j1530) {
        rowEnds[13]! = rowStarts[13]! + j1530
        rowStarts[14]! = rowEnds[13]!
      }

      const j16 = tempJobs.filter((j) => getHours(j.start!) == 16 || getHours(j.end!) == 16).length
      if (rowEnds[14]! - rowStarts[14]! < j16) {
        rowEnds[14]! = rowStarts[14]! + j16
        rowStarts[15]! = rowEnds[14]!
      }

      const j1630 = tempJobs.filter(
        (j) =>
          (getHours(j.start!) == 16 && getMinutes(j.start!) == 30) ||
          (getHours(j.end!) == 16 && getMinutes(j.end!) == 30)
      ).length
      if (rowEnds[15]! - rowStarts[15]! < j1630) {
        rowEnds[15]! = rowStarts[15]! + j1630
        rowStarts[16]! = rowEnds[15]!
      }

      const j17 = tempJobs.filter((j) => getHours(j.end!) == 17).length
      if (rowEnds[16]! - rowStarts[16]! < j17) {
        rowEnds[16]! = rowStarts[16]! + j17
      }

      // }
    }
  }

  return {
    rowStarts,
    rowEnds,
  }
}

export default rowSpacing
