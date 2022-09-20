import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"

type ConfirmDeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  onConfirm: () => Promise<any>
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const confirm = async () => {
    setIsLoading(true)
    await onConfirm()
    setIsLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(2px) invert(10%) hue-rotate(90deg)" />
      <ModalContent>
        <ModalCloseButton />

        <ModalHeader>{title}</ModalHeader>

        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="red" onClick={confirm} isLoading={isLoading}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDeleteModal
