import { ReactNode, PropsWithoutRef } from "react"
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
  FormProps,
  FormRenderProps,
} from "react-final-form"
import { TypeOf, z } from "zod"
import { PromiseReturnType, validateZodSchema } from "blitz"
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
} from "@chakra-ui/react"
import { FormComponent } from "./FormComponent"
export { FORM_ERROR } from "final-form"

type ModalFormProps = {
  isOpen: boolean
  onClose: () => void
  size?: ModalProps["size"]
  title: string
  submitText: string
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

  schema,
  initialValues,
  onSubmit,
  render,
  children,
  ...props
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px)" />
      <FinalForm
        initialValues={initialValues}
        validate={validateZodSchema(schema)}
        onSubmit={onSubmit}
        render={(form) => (
          <form onSubmit={form.handleSubmit} {...props}>
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {form.submitError && (
                  <Alert status="error" mb={6}>
                    <AlertIcon />
                    {Array.isArray(form.submitError) ? (
                      <UnorderedList>
                        {form.submitError.map((error, i) => (
                          <ListItem key={i}>{error}</ListItem>
                        ))}
                      </UnorderedList>
                    ) : (
                      form.submitError
                    )}
                  </Alert>
                )}

                {/* Form fields supplied as children are rendered here */}
                <Stack spacing={4}>{render(form)}</Stack>
              </ModalBody>

              <ModalFooter>
                <HStack>
                  <Button isLoading={form.submitting} type="submit">
                    {submitText}
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
