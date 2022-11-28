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
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Job } from "@prisma/client"
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
  getHours,
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

  const countJobsByHour = (jobs: Job[], hour: number) => {
    const startArray = [
      jobs.filter((j) => {
        if (getHours(j.start!) == 9) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 10) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 11) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 12) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 13) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 14) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 15) return j
      }).length,
      jobs.filter((j) => {
        if (getHours(j.start!) == 16) return j
      }).length,
      0,
    ]
    const endArray = [
      0,
      ...jobs.map((j) => getHours(j.end!) == 10),
      ...jobs.map((j) => getHours(j.end!) == 11),
      ...jobs.map((j) => getHours(j.end!) == 12),
      ...jobs.map((j) => getHours(j.end!) == 13),
      ...jobs.map((j) => getHours(j.end!) == 14),
      ...jobs.map((j) => getHours(j.end!) == 15),
      ...jobs.map((j) => getHours(j.end!) == 16),
      ...jobs.map((j) => getHours(j.end!) == 17),
    ]

    startArray.forEach((n, ii) => {
      return n + endArray[ii]
    })

    return startArray + endArray
  }

  const weekHeading = () => {
    if (monday.getMonth() == friday.getMonth()) {
      return `${format(monday, "d")} - ${format(friday, "d MMM yy")}`
    } else {
      return `${format(monday, "d MMM")} - ${format(friday, "d MMM yy")}`
    }
  }

  return (
    <Flex>
      <Box w="100vw" m={2} borderWidth={1} borderColor="blue.400" borderRadius={3}>
        <HStack m={2} justify="space-between" align="start">
          {/* <Text textAlign='left' fontWeight='semibold' bgColor='blackAlpha.100'>
              {format(monday, 'EEE, do LLL yy')}
            </Text>
            {timeRange9_17().map((t, ii) => (
              <HourView key={ii} time={t} jobs={mondayJobs} />
            ))} */}
          {/* <Box position='absolute'>
            <VStack align='start'>
              <>
                <Text>
                  {`Week ${weekNumber}`}
                </Text>
                {timeRange9_17().map((t, ii) => {
                  return (
                    <>
                      {
                        ii % 2 == 1 ? (
                          <Text key={ii}>{t.toString()}</Text>
                        ) : (
                          <Divider key={ii} w='100vw' />
                          // <Text key={ii}>asdf</Text>
                        )
                      }
                    </>
                  )
                })}
              </>
            </VStack>
          </Box> */}
          <HStack position="relative">
            <Box w="150px">
              <Grid
                templateRows="repeat(10, 1fr)"
                templateColumns="repeat(6, 1fr)"
                // templateAreas={`'9 m t w th f'
                //                 '10 m t w th f'
                //                 '11 m t w th f'
                //                 '12 m t w th f'
                //                 '13 m t w th f'
                //                 '14 m t w th f'
                //                 '15 m t w th f'
                //                 '16 m t w th f'
                //                 '17 m t w th f'`}
              >
                <GridItem rowSpan={1} colStart={0} colEnd={1} w="max">
                  <Text fontWeight="bold">
                    {/* {`Week ${weekNumber}`} */}
                    {weekHeading()}
                  </Text>
                </GridItem>
                {timeRange9_17().map((t, ii) => {
                  return (
                    <>
                      {ii % 2 == 1 ? (
                        <GridItem key={ii} rowSpan={1} colStart={0} colEnd={1}>
                          <Text>{t.toString()}</Text>
                        </GridItem>
                      ) : (
                        <GridItem key={ii} rowSpan={1} colStart={0} colEnd={1}>
                          <Divider key={ii} w="100vw" />
                          {/* <Text key={ii}>asdf</Text> */}
                        </GridItem>
                      )}
                    </>
                  )
                })}
              </Grid>
            </Box>
            <DayView day={tuesday} jobs={tuesdayJobs} />
            {/* <DayView day={tuesday} jobs={tuesdayJobs} />
            <DayView day={wednesday} jobs={wednesdayJobs} />
            <DayView day={thursday} jobs={thursdayJobs} />
            <DayView day={friday} jobs={fridayJobs} /> */}
          </HStack>
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
