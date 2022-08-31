import { MutateFunction, resolver, useMutation } from "@blitzjs/rpc"
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
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react"
import createCustomer from "app/customers/mutations/createCustomer"
import { string } from "zod"

interface DeleteModalProps extends Partial<ModalProps> {
  label: string
  message: string
  submitText: string
  isOpen: boolean
  onClose: () => void
  mutation: MutateFunction<any>
}

export default resolver.pipe(
  resolver.authorize("Admin"),
  ({ label, message, submitText, isOpen, onClose, mutation, ...props }: DeleteModalProps) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} {...props}>
          <ModalOverlay bg="red" />
          <ModalContent>
            <ModalHeader>{label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{message}</ModalBody>

            <ModalFooter>
              <HStack w="inherit">
                <Button colorScheme="blackAlpha" type="submit">
                  {submitText}
                </Button>
                <span />
                <Button onClick={onClose}>Canel</Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
)
