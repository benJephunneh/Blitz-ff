import {
  Box,
  Button,
  Flex,
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
import { addDays, format, setHours } from "date-fns"
import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

const TestCalendar = () => {
  const [value, onChange] = useState<Date>()
  const toast = useToast()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const [startDateTime, setStartDateTime] = useState<Date>(new Date())
  const [endDateTime, setEndDateTime] = useState<Date>(new Date())

  useEffect(() => {
    // console.log(JSON.stringify(value))
    if (!Array.isArray(value)) return

    ;(async () => {
      setStartDateTime(value.at(0).setHours(9, 0, 0, 0))
      setEndDateTime(value.at(1).setHours(17, 0, 0, 0))
    })().catch((e) => console.log(e.message))
  }, [value])
  useEffect(() => {
    console.log(`startDateTime: ${format(startDateTime, "HHmm EEEE, do MMM")}`)
    console.log(`endDateTime: ${format(endDateTime, "HHmm EEEE, do MMM")}`)
    console.log(startDateTime)
    console.log(endDateTime)
    console.log(`startDateTime: ${format(startDateTime, "HHmm EEEE, do MMM")}`)
    console.log(`endDateTime: ${format(endDateTime, "HHmm EEEE, do MMM")}`)
  }, [startDateTime, endDateTime])

  return (
    <Box>
      <Button onClick={onToggle}>Click</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>asdfadsf</ModalHeader>

          <ModalBody>
            <Text>description</Text>
            <Calendar onChange={onChange} value={value} selectRange />
          </ModalBody>

          <ModalFooter>{`${value}`}</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default TestCalendar
