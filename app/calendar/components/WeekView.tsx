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
import jobsByHour from "app/jobs/components/jobsByHour"
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
  getMinutes,
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

  const { starts, stops } = jobsByHour(jobsByWeek)
  const { jobs: mondayJobsBySlot } = jobsByHour(mondayJobs)
  const { jobs: tuesdayJobsBySlot } = jobsByHour(tuesdayJobs)
  const { jobs: wednesdayJobsBySlot } = jobsByHour(wednesdayJobs)
  const { jobs: thursdayJobsBySlot } = jobsByHour(thursdayJobs)
  const { jobs: fridayJobsBySlot } = jobsByHour(fridayJobs)

  // console.table({ ...jobsByWeek })
  // console.table({ ...mondayJobs })
  // console.log('rowSpans', rowSpans)

  // const tuesdayJobCountsByHour = countJobsByHour(tuesdayJobs)
  // console.log({ tuesdayJobCountsByHour })

  const weekHeading = () => {
    if (monday.getMonth() == friday.getMonth()) {
      return `${format(monday, "d")} - ${format(friday, "d MMM yy")}`
    } else {
      return `${format(monday, "d MMM")} - ${format(friday, "d MMM yy")}`
    }
  }

  return (
    <Flex>
      <Box w="max" m={2} p={2} borderWidth={1} borderColor="blue.400" borderRadius={3}>
        {/* <HStack m={2} justify="space-between" align="start"> */}
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
        {/* <HStack position="relative" m={2}> */}
        {/* <Box w="max"> */}
        <Grid
          templateRows="repeat(18, 1fr)"
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
          <GridItem rowStart={0} rowEnd={1} colStart={0} colEnd={1} w="max">
            <Text fontWeight="bold">{weekHeading()}</Text>
          </GridItem>
          {timeRange9_17().map((t, ii) => (
            <>
              {ii % 2 == 0 ? (
                <GridItem
                  key={ii}
                  rowStart={starts.at(ii)! + 1}
                  rowEnd={stops.at(ii)! + 1}
                  colStart={0}
                  colEnd={1}
                >
                  <Divider />
                  <Text>{t}</Text>
                </GridItem>
              ) : (
                <GridItem
                  key={ii}
                  rowStart={starts.at(ii)! + 1}
                  rowEnd={stops.at(ii)! + 1}
                  colStart={0}
                  colEnd={1}
                >
                  <Divider ml={20} />
                </GridItem>
              )}
            </>
          ))}
          <DayView day={monday} jobs={mondayJobsBySlot} starts={starts} stops={stops} />
          <DayView day={tuesday} jobs={tuesdayJobsBySlot} starts={starts} stops={stops} />
          <DayView day={wednesday} jobs={wednesdayJobsBySlot} starts={starts} stops={stops} />
          <DayView day={thursday} jobs={thursdayJobsBySlot} starts={starts} stops={stops} />
          <DayView day={friday} jobs={fridayJobsBySlot} starts={starts} stops={stops} />
        </Grid>
        {/* </Box> */}
        {/* </HStack> */}
        {/* </HStack> */}
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
