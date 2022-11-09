import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import {
  areIntervalsOverlapping,
  endOfDay,
  format,
  getWeek,
  startOfWeek,
  addDays,
  subDays,
} from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"
import timeRange9_17 from "../helpers/timeRange9_17"
import DayView from "./DayView"
import HourView from "./HourView"
import Monday from "./Monday"

type WeekViewProps = {
  weekNumber?: number
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}

const WeekView = ({ weekNumber = getWeek(new Date(), { weekStartsOn: 1 }) - 1 }: WeekViewProps) => {
  console.log({ weekNumber })
  const [jobsByWeek, { refetch: refetchJobsWeek }] = useQuery(
    findJobsByWeek,
    { weekNumber },
    { refetchOnWindowFocus: false }
  )
  const currentWeek = getWeek(new Date())
  const dayDifference = (currentWeek - (weekNumber + 1)) * 7

  const monday = startOfWeek(subDays(new Date(), dayDifference), { weekStartsOn: 1 })
  const tuesday = addDays(monday, 1)
  const wednesday = addDays(monday, 2)
  const thursday = addDays(monday, 3)
  const friday = addDays(monday, 4)

  const mondayInterval: Interval = { start: monday, end: endOfDay(monday) }
  const tuesdayInterval: Interval = { start: tuesday, end: endOfDay(tuesday) }
  const wednesdayInterval: Interval = { start: wednesday, end: endOfDay(wednesday) }
  const thursdayInterval: Interval = { start: thursday, end: endOfDay(thursday) }
  const fridayInterval: Interval = { start: friday, end: endOfDay(friday) }
  // console.log({ monday })

  const mondayJobs = jobsByWeek.filter((j) =>
    areIntervalsOverlapping({ start: j.start!, end: j.end! }, mondayInterval)
  )
  const tuesdayJobs = jobsByWeek.filter((j) =>
    areIntervalsOverlapping({ start: j.start!, end: j.end! }, tuesdayInterval)
  )
  const wednesdayJobs = jobsByWeek.filter((j) =>
    areIntervalsOverlapping({ start: j.start!, end: j.end! }, wednesdayInterval)
  )
  const thursdayJobs = jobsByWeek.filter((j) =>
    areIntervalsOverlapping({ start: j.start!, end: j.end! }, thursdayInterval)
  )
  const fridayJobs = jobsByWeek.filter((j) =>
    areIntervalsOverlapping({ start: j.start!, end: j.end! }, fridayInterval)
  )
  // console.table({ ...jobsByWeek })
  // console.table({ ...mondayJobs })

  return (
    <Flex>
      <Box w="100vw">
        <HStack m={2} justify="space-between" align="start">
          {/* <Text textAlign='left' fontWeight='semibold' bgColor='blackAlpha.100'>
              {format(monday, 'EEE, do LLL yy')}
            </Text>
            {timeRange9_17().map((t, ii) => (
              <HourView key={ii} time={t} jobs={mondayJobs} />
            ))} */}
          <DayView day={monday} jobs={mondayJobs} />
          <DayView day={tuesday} jobs={tuesdayJobs} />
          <DayView day={wednesday} jobs={wednesdayJobs} />
          <DayView day={thursday} jobs={thursdayJobs} />
          <DayView day={friday} jobs={fridayJobs} />
        </HStack>
        {/* {jobsByWeek?.map((j, ii) => (
          <>
            onClick: Pick customer
            onClick: Pick location
            onClick: Pick job
            If completed, opacity change
            <pre key={ii}>{JSON.stringify(j, null, 2)}</pre>
          </>
        ))} */}
      </Box>
    </Flex>
  )
}

export default WeekView
