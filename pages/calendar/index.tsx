import { BlitzPage, Routes } from "@blitzjs/next"
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { format, getWeek, Interval, isSameMinute, isWithinInterval } from "date-fns"
import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import Layout from "app/core/layouts/Layout"
import DayView from "app/calendar/components/DayView"
import WeekView from "app/calendar/components/WeekView"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import getLocations from "app/locations/queries/getLocations"
import { useQuery } from "@blitzjs/rpc"
import { Job } from "@prisma/client"
import timeRange9_17 from "app/calendar/helpers/timeRange9_17"
import HourView from "app/calendar/components/HourView"

import "react-calendar/dist/Calendar.css"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import DashboardSubheader from "app/dashboard/DashboardSubheader"

const formattedStart = (j: Job) => {
  // console.log(format(j.start!, 'Hmm'))
  return format(j.start!, "Hmm")
}
const sametime = (j: Job, t: number) => {
  const isMatch = formattedStart(j) === t.toString()
  return isMatch
}
type ShowJobTimeMatchProps = {
  time: number
  jobs?: Job[]
}

const filterJobsByDate = (date: Date, jobs: Job[]) => {
  if (!jobs) return []
  for (let ii = 0; ii < jobs.length; ii++) {
    const interval: Interval = {
      start: jobs[ii]!.start!,
      end: jobs[ii]!.end!,
    }
    const jj = jobs.findIndex((j) => isWithinInterval(date, interval))

    // if (!isWithinInterval(date, interval)) {
    //   jobs.splice(interval, 1)
    // }
  }

  return jobs
}

export const ShowJobTimeMatch = ({ time, jobs }: ShowJobTimeMatchProps) => {
  const js = jobs?.filter((j) => sametime(j, time))
  // const j = jobs?.find((j) => sametime(j, time))
  // console.log({ time })
  // console.log({ ...jobs })
  // console.log(sametime(jobs?.[0]!, time))

  return (
    <>
      {js?.map((j, ii) => (
        <Text key={ii}>{j?.title}</Text>
      ))}
    </>
  )
}

const TestCalendar: BlitzPage = () => {
  const [value, onChange] = useState<Date>()
  const toast = useToast()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const [date, setDate] = useState<Date>(new Date())
  // const [weekNumber, setWeekNumber] = useState<number>(getWeek(new Date()) - 1)
  const [calendarView, setCalendarView] = useState(<WeekView />)
  // const locations = []
  // const jobs = []
  // const [jobsByWeek, { refetch: refetchJobs }] = useQuery(
  //   findJobsByWeek,
  //   {
  //     // where: { customerId }, // date filtering cause perpetul calls -- because start/end are Date | undefined ?
  //     weekNumber,
  //     orderBy: { start: "asc" },
  //   },
  //   {
  //     enabled: !!weekNumber,
  //     refetchOnWindowFocus: false,
  //     // staleTime: Infinity,
  //   }
  // )

  // useEffect(() => {
  //   refetch()
  //     .catch(console.error)
  // }, [])
  // const [jobsByWeek, { refetch: refetchWeekJobs }] = useQuery(
  //   findJobsByWeek,
  //   { weekNumber },
  //   { refetchOnWindowFocus: false }
  // )
  // const [jobsByDay, { refetch: refetchDayJobs }] = useQuery(
  //   findJobsByDate,
  //   { date },
  //   { refetchOnWindowFocus: false }
  // )

  const handleWeekNumberClick = async (w: number) => {
    // console.log({ w })
    // setWeekNumber(w)
    // await refetchWeekJobs()
    setCalendarView(<WeekView weekNumber={w} />)
  }
  // const handleDayClick = async (d: Date) => {
  //   // console.log({ d })
  //   // await refetchDayJobs()
  //   setCalendarView(<DayView day={d} />)
  // }

  // useEffect(() => {
  //   // console.log(JSON.stringify(value))
  //   if (Array.isArray(value)) {
  //     if (value.some((v) => typeof v == undefined)) return
  //     ;(async () => {
  //       setStartDateTime(value.at(0).setHours(9, 0, 0, 0))
  //       setEndDateTime(value.at(1).setHours(17, 0, 0, 0))
  //     })().catch((e) => console.log(e.message))
  //   }
  // }, [value])
  // useEffect(() => {
  //   console.log(startDateTime)
  //   console.log(endDateTime)
  //   console.log(`startDateTime: ${format(startDateTime, "HHmm EEEE, do MMM")}`)
  //   console.log(`endDateTime: ${format(endDateTime, "HHmm EEEE, do MMM")}`)
  // }, [startDateTime, endDateTime])

  return (
    <Flex direction="column">
      {/* <Button onClick={onToggle}>Click</Button> */}
      {/* <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>asdfadsf</ModalHeader>

          <ModalBody>
            <Text>description</Text> */}
      <Calendar
        onChange={onChange}
        value={value}
        // selectRange
        showWeekNumbers
        // onClickDay={handleDayClick}
        onClickWeekNumber={handleWeekNumberClick}
      />
      {calendarView}
      {/* <Flex>
        <Box bg="transparent">
          {timeRange9_17().map((t, ii) => (
            // <>
            //   <Heading key={ii} size='sm'>{t}</Heading>
            //   <ShowJobTimeMatch jobs={jobsByWeek} time={t} />
            //   <Divider mt={4} />
            // </>
            <HourView key={ii} time={t} jobs={jobsByWeek} />
          ))}
        </Box>
      </Flex> */}
      {/* <TableContainer>
        <Table size="sm" w="25vw">
          <TableCaption>Monday schedule</TableCaption>
          <Thead>
            <Tr>
              <Th>Monday</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobsByWeek?.map((j, ii) => (
              <Tr key={ii}>
                <Td>{j.title}</Td>
                <Td>{j.start ? format(j.start, 'HHmm E d LLL y') : ''}</Td>
                <Td>{j.end?.toDateString()}</Td>
                <Td>{j.completed.toString()}</Td>
              </Tr>
            ))}
            {locations?.map((l, ii) => (
              <Tr key={ii}>
                <Td>{l.customerId}</Td>
                <Td>{l.house}</Td>
                <Td>{l.street}</Td>
                <Td>{l.city}</Td>
                <Td>{l.state}</Td>
                <Td>{l.zipcode}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Monday</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer> */}
      {/* {monday && (
        <>
          <HStack justify="space-evenly" alignItems="start" mt={2} spacing={0}>
            <DayView date={monday} />
            <Divider orientation="vertical" />
            <DayView date={addDays(monday, 1)} />
            <Divider orientation="vertical" />
            <DayView date={addDays(monday, 2)} />
            <Divider orientation="vertical" />
            <DayView date={addDays(monday, 3)} />
            <Divider orientation="vertical" />
            <DayView date={addDays(monday, 4)} />
          </HStack>
          <Grid templateColumns="repeat(5, 1fr)" justifyContent="center" w="100vw">
            <GridItem colSpan={1}>
              <Center>
                <Text>Monday jobs</Text>
              </Center>
            </GridItem>
            <GridItem colSpan={1}>
              <Center>
                <Text>
                  <Text>Tuesday jobs</Text>
                </Text>
              </Center>
            </GridItem>
            <GridItem colSpan={1}>
              <Center>
                <Text>Wednesday jobs</Text>
              </Center>
            </GridItem>
            <GridItem colSpan={1}>
              <Center>
                <Text>Thursday jobs</Text>
              </Center>
            </GridItem>
            <GridItem colSpan={1}>
              <Center>
                <Text>Friday jobs</Text>
              </Center>
            </GridItem>
          </Grid>
          <Text>{monday?.toDateString()}</Text>
        </>
      )} */}
    </Flex>
  )
}

TestCalendar.authenticate = { redirectTo: Routes.Home() }
TestCalendar.getLayout = (page) => (
  <HeaderLayout title="Customers" description="Customer list" subheader={<DashboardSubheader />}>
    {page}
  </HeaderLayout>
)

export default TestCalendar
