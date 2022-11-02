import { BlitzPage } from "@blitzjs/next"
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useStyles,
  useToast,
} from "@chakra-ui/react"
import { addDays, format, getWeek, setHours, startOfWeek, subDays, weeksToDays } from "date-fns"
import { Suspense, useEffect, useState } from "react"
import Calendar from "react-calendar"
import Layout from "app/core/layouts/Layout"
import "react-calendar/dist/Calendar.css"
import DayView from "app/calendar/components/DayView"
import WeekView from "app/calendar/components/WeekView"

const TestCalendar: BlitzPage = () => {
  const [value, onChange] = useState<Date>()
  const toast = useToast()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const [weekNumber, setWeekNumber] = useState(getWeek(new Date()) - 1)
  const [calendarView, setCalendarView] = useState(<WeekView />)

  const handleWeekNumberClick = async (w: number) => {
    console.log({ w })
    setWeekNumber(w)
    setCalendarView(<WeekView weekNumber={w} />)
  }
  const handleDayClick = async (d: Date) => {
    console.log({ d })
    setCalendarView(<DayView day={d} />)
  }

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
        selectRange
        showWeekNumbers
        onClickDay={handleDayClick}
        onClickWeekNumber={handleWeekNumberClick}
      />
      {calendarView}
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

TestCalendar.getLayout = (page) => <Layout title="Calendar test page">{page}</Layout>
export default TestCalendar
