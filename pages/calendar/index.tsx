import { BlitzPage } from "@blitzjs/next"
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
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

const TestCalendar: BlitzPage = () => {
  const [value, onChange] = useState<Date>()
  const toast = useToast()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const [startDateTime, setStartDateTime] = useState<Date>(new Date())
  const [endDateTime, setEndDateTime] = useState<Date>(new Date())
  const [monday, setMonday] = useState<Date>()
  const [friday, setFriday] = useState<Date>()

  const handleWeekNumberClick = async (w: number) => {
    const currentWeek = getWeek(new Date())
    const dayDifference = (currentWeek - (w + 1)) * 7
    const monday = startOfWeek(subDays(new Date(), dayDifference), { weekStartsOn: 1 })
    const friday = addDays(monday, 4)

    // console.log({ w })
    // console.log({ currentWeek })
    // console.log(`weeksToDays: ${weeksToDays(w)}`)
    // console.table([{ Monday: monday, Friday: friday }])

    // return {
    //   monday,
    //   friday,
    // }

    setMonday(monday)
    setFriday(friday)
  }

  useEffect(() => {
    // console.log(JSON.stringify(value))
    if (Array.isArray(value)) {
      if (value.some((v) => typeof v == undefined)) return
      ;(async () => {
        setStartDateTime(value.at(0).setHours(9, 0, 0, 0))
        setEndDateTime(value.at(1).setHours(17, 0, 0, 0))
      })().catch((e) => console.log(e.message))
    }
  }, [value])
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
        onClickWeekNumber={handleWeekNumberClick}
      />
      <Grid templateColumns="repeat(5, 1fr)" justifyContent="center" w="50vw">
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

      {/* </ModalBody>

          <ModalFooter>{`${value}`}</ModalFooter>
        </ModalContent>
      </Modal> */}
    </Flex>
  )
}

TestCalendar.getLayout = (page) => <Layout title="Calendar test page">{page}</Layout>
export default TestCalendar
