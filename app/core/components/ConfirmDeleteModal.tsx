import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdGraphicEq } from "react-icons/md"

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
  const [sliderValue, setSliderValue] = useState(0)
  const confirm = async () => {
    setIsLoading(true)
    await onConfirm()
    setIsLoading(false)
    onClose()
  }

  // useEffect(() => {
  //   (async () => {
  //     console.log('deleting...')
  //     if (sliderValue === 100) await confirm()
  //   })
  // }, [sliderValue])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(2px) invert(10%) hue-rotate(90deg)" />
      <ModalContent>
        <ModalCloseButton />

        <ModalHeader bg="red" textColor="white">
          {title}
        </ModalHeader>

        <ModalBody>
          <Text>{description}</Text>
          <br />
          <Slider
            defaultValue={0}
            onChange={async (v) => {
              if (v === 100) await confirm()
            }}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="red" />
            </SliderTrack>
            <SliderThumb boxSize={6} borderColor="red">
              <Box color="tomato" as={MdGraphicEq} />
            </SliderThumb>
          </Slider>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            {/* <Button colorScheme="red" onClick={confirm} isLoading={isLoading}>
              Delete
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDeleteModal
