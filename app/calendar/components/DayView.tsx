import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Job, Prisma } from "@prisma/client"
import headerContext from "app/core/components/header/headerContext"
import { IFinalJobsByHour } from "app/jobs/components/jobsByHour"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import {
  addDays,
  differenceInHours,
  format,
  getDay,
  getHours,
  getMinutes,
  getWeek,
  isAfter,
  isBefore,
  isSameDay,
} from "date-fns"
import Link from "next/link"
import { useRouter } from "next/router"
import { ShowJobTimeMatch } from "pages/calendar"
import { useContext, useEffect, useState } from "react"
import timeRange9_17 from "../helpers/timeRange9_17"
import HourView from "./HourView"

interface DayViewProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  day: Date //'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  date?: Date
  jobs: Job[][]
  starts: number[]
  stops: number[]
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}

const slotsOfBusinessDay = (dayStart = 9, job: Job) => {
  let startSlot = (getHours(job.start!) - dayStart) * 2
  if (getMinutes(job.start!) == 30) startSlot++

  let stopSlot = (getHours(job.end!) - dayStart) * 2 + 1
  if (getMinutes(job.end!) == 30) stopSlot++

  return {
    startSlot,
    stopSlot,
  }
}

const jobSpan = (job: Job) => {
  const { startSlot, stopSlot } = slotsOfBusinessDay(9, job)
  return {
    startSlot,
    stopSlot,
  }
}

const shades = ["red.200", "green.200", "blue.200"]
const jobIndex = (job: Job, date: Date) => {
  const jobKey = {
    9: 0,
    930: 1,
    10: 2,
    1030: 3,
    11: 4,
    1130: 5,
    12: 6,
    1230: 7,
    13: 8,
    1330: 9,
    14: 10,
    1430: 11,
    15: 12,
    1530: 13,
    16: 14,
    1630: 15,
    17: 16,
  }
  let hour: string, minutes: number
  if (isSameDay(job.start!, job.end!) || isAfter(job.end!, date)) {
    hour = getHours(job.start!).toString()
    minutes = getMinutes(job.start!)
    if (minutes === 30) hour.concat(minutes.toString())
  } else hour = "0"
  const jobStart = jobKey[hour]

  if (isSameDay(job.start!, job.end!) || isBefore(job.start!, date)) {
    hour = getHours(job.end!).toString()
    minutes = getMinutes(job.end!)
    if (minutes === 30) hour.concat(minutes.toString())
  } else hour = "17"
  const jobEnd = jobKey[hour]

  // console.log('jobStart', jobStart)
  // console.log('jobEnd', jobEnd)

  return {
    jobStart,
    jobEnd,
  }
}

const DayView = ({
  day,
  jobs,
  starts,
  stops,
  date = addDays(new Date(), 1),
  orderBy = { start: "asc" },
}: DayViewProps) => {
  const router = useRouter()
  const { pickLocation } = useContext(headerContext)
  // const slots = slotsOfBusinessDay(9, jobs[0]!)
  // console.log('slots', slots)

  // const o9 = jobs.filter((j) => getHours(j.start!) == 9)
  // const one0 = jobs.filter((j) => getHours(j.start!) == 10)
  // const one1 = jobs.filter((j) => getHours(j.start!) == 11)
  // const one2 = jobs.filter((j) => getHours(j.start!) == 12)
  // const one3 = jobs.filter((j) => getHours(j.start!) == 13)
  // const one4 = jobs.filter((j) => getHours(j.start!) == 14)
  // const one5 = jobs.filter((j) => getHours(j.start!) == 15)
  // const one6 = jobs.filter((j) => getHours(j.start!) == 16)
  // const one7 = jobs.filter((j) => getHours(j.start!) == 17)

  // console.log(getHours(o9[0]?.start!))

  return (
    <>
      <GridItem rowStart={0} rowEnd={1} ml={4} w="max">
        <Text textAlign="left" fontWeight="semibold" bgColor="blackAlpha.100" my={0}>
          {format(day, "EEE d")}
        </Text>
      </GridItem>
      {jobs.map((jj, hh) => (
        <>
          {jj.map((j, ii) => {
            const ji = jobIndex(j, day)
            return (
              <>
                <GridItem
                  key={ii}
                  ml={4 + ii * 3}
                  // bg={shades[ji % 3]}
                  bgGradient={`linear(to-r, ${shades[ii % 3]}, whiteAlpha.900)`}
                  fontSize="xs"
                  rowStart={starts[ji.jobStart]! + ii + 1}
                  rowEnd={stops[ji.jobEnd]! + 1}
                  colStart={getDay(j.start!)}
                  colEnd={getDay(j.end!) + 1}
                  w="full"
                  // position=
                  // transform=
                  onClick={() => {
                    router
                      .push(Routes.ShowCustomerPage({ customerId: j.customerId }))
                      .then(() => pickLocation(j.locationId))
                      .catch(console.error)
                  }}
                  _hover={{ cursor: "pointer" }}
                >
                  {j.title}
                </GridItem>
                {/* <HourView key={ii} time={t} jobs={jobs} showHour={false} />
              <Text key={ii}>{t}</Text>
              <ShowJobTimeMatch jobs={jobStarts} time={t} />
              <Divider /> */}
              </>
            )
          })}
        </>
      ))}
    </>
  )
}
{
  /* <Box bg='blue'>
        {jobStarts &&
          jobStarts.map((j, ii) => (
            <>
              onClick: Pick customer
              onClick: Pick location
              onClick: Pick job
              If completed, opacity change
              <pre>{JSON.stringify(jobStarts, null, 2)}</pre>
            </>
          ))}
        </Box> */
}

export default DayView
