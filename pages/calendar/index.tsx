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
import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

const TestCalendar = () => {
  const [value, onChange] = useState(new Date())
  const toast = useToast()
  const { isOpen, onClose, onToggle } = useDisclosure()

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
            <Calendar onChange={onChange} value={value} />
          </ModalBody>

          <ModalFooter>{`${value}`}</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default TestCalendar
