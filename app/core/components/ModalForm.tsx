import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
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
} from "@chakra-ui/react"
import { FormComponent } from "./FormComponent"
export { FORM_ERROR } from "final-form"

export interface ModalFormProps
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  size?: ModalProps["size"]
  title: string
  isOpen: boolean
  onClose: () => void
}

const ModalForm: FormComponent<ModalFormProps> = ({
  schema,
  initialValues,
  onSubmit,
  render,
  submitText,
  isOpen,
  onClose,
  size,
  title,
  children,
  ...props
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="inside">
      <ModalOverlay />
      <FinalForm
        initialValues={initialValues}
        validate={validateZodSchema(schema)}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, submitError }) => (
          <form onSubmit={handleSubmit} {...props}>
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                {/* Form fields supplied as children are rendered here */}
                {children}

                {submitError && (
                  <div role="alert" style={{ color: "red" }}>
                    {submitError}
                  </div>
                )}

                {submitText && (
                  <button type="submit" disabled={submitting}>
                    {submitText}
                  </button>
                )}
              </ModalBody>

              <ModalFooter>
                <HStack>
                  <Button colorScheme="#009a4c" isLoading={submitting} type="submit">
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
