import { Form as FinalForm } from "react-final-form"
import { validateZodSchema } from "blitz"
import {
  Alert,
  AlertIcon,
  Button,
  HStack,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import { FormComponent } from "./FormComponent"
import { FaPlus } from "react-icons/fa"
import { FcClock } from "react-icons/fc"
export { FORM_ERROR } from "final-form"

type ModalFormProps = {
  isOpen: boolean
  onClose: () => void
  size?: ModalProps["size"]
  title: string
  submitText: string
  disableStash?: boolean
  /** All your form fields */
  // children?: ReactNode
  /** Text to display in the submit button */
  // onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  // initialValues?: FinalFormProps<z.infer<S>>['initialValues']
  // schema?: S
  // render: (props: FormRenderProps<TypeOf<S>>) => JSX.Element
}

const ModalForm: FormComponent<ModalFormProps> = ({
  isOpen,
  onClose,
  size,
  title,
  submitText,
  disableStash,

  schema,
  initialValues,
  onSubmit,
  render,
  children,
  ...props
}) => {
  const modalBgColor = useColorModeValue("gray.50", "gray.900")
  const modalHeaderColor = useColorModeValue("black.900", "cyan.300")
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px) invert(10%)" />
      <FinalForm
        initialValues={initialValues}
        validate={validateZodSchema(schema)}
        onSubmit={onSubmit}
        render={(phorm) => (
          <form onSubmit={phorm.handleSubmit} {...props}>
            <ModalContent bg={modalBgColor}>
              <ModalHeader textColor={modalHeaderColor}>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {phorm.submitError && (
                  <Alert status="error" mb={6}>
                    <AlertIcon />
                    {Array.isArray(phorm.submitError) ? (
                      <UnorderedList>
                        {phorm.submitError.map((error, i) => (
                          <ListItem key={i}>{error}</ListItem>
                        ))}
                      </UnorderedList>
                    ) : (
                      phorm.submitError
                    )}
                  </Alert>
                )}

                {/* Form fields supplied as children are rendered here */}
                <Stack spacing={4}>{render(phorm)}</Stack>
              </ModalBody>

              <ModalFooter>
                <HStack>
                  <Button
                    onClick={() => {
                      phorm.form.change("stashing", false)
                    }}
                    disabled={phorm.pristine || phorm.submitting}
                    type="submit"
                  >
                    {submitText}
                  </Button>
                  <Button
                    onClick={() => phorm.form.change("stashing", true)}
                    disabled={disableStash || phorm.pristine || phorm.submitting}
                    type="submit"
                    variant="outline"
                    colorScheme="red"
                    rightIcon={<FcClock size={20} />}
                  >
                    Stash
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      />
    </Modal>
  )
}

export default ModalForm
