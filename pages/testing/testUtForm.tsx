import { BlitzPage } from "@blitzjs/next"
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import CLJWizard from "app/core/components/forms/CLJWizard"
import SubmitButton from "app/core/components/forms/components/SubmitButton"
import TextFieldUtf from "app/core/components/forms/components/TextFieldUtf"
import { CustomerFormSchema } from "app/customers/validations"
import { JobFormSchema } from "app/jobs/validations"
import { LocationFormSchema } from "app/locations/validations"
import { useState } from "react"
import { Form, Input, useForm, useValidation } from "usetheform"
import { z } from "zod"

const fieldSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
})

const validateForm = (v) => {
  try {
    fieldSchema.parse(v)
  } catch (e) {
    // console.log({ e })
    if (e.errors[0].path === "") {
      return { all: e.errors[0].message }
    } else {
      return e.errors.reduce((acc, errObj) => {
        const namefield = errObj.path[0]
        acc = { ...acc, [namefield]: errObj.message }
        return acc
      }, {})
    }
  }
}

const TestUtForm: BlitzPage = () => {
  // const required = (v) => (v && v.trim() !== "" ? undefined : "Required")
  // const onChange = (e) => console.log("On change: ", e)
  const page = 1
  const onSubmit = (e) => {
    console.log("On submit: ", e)
  }

  const [wizardPage, setPage] = useState(1)
  const next = () => setPage((p) => ++p)
  const prev = () => setPage((p) => --p)

  const [{ error, isValid }, validation] = useValidation([validator])
  const [getWizardState, wizard] = useMultipleForm((s) => updateJson(s))
  const [wizardState, updateJson] = useState({})

  const schemas = [CustomerFormSchema, LocationFormSchema, JobFormSchema]

  const validateForm = (v) => {
    try {
      schemas.at(page - 1)?.parse(v)
    } catch (e) {
      if (e.errors[0].path === "") return { all: e.errors[0].message }
      else
        return e.errors.reduce((acc, errObj) => {
          const namefield = errObj.path[0]
          acc = { ...acc, [namefield]: errObj.message }
        })
    }
  }

  // const [{ error: errors }, validation] = useValidation([validateForm])
  // const firstnameError = errors?.["firstname"] || errors?.["all"]
  // const lastnameError = errors?.["lastname"] || errors?.["all"]
  // const emailError = errors?.["email"] || errors?.["all"]
  // console.log({ firstnameError }) // E.g. 'Required'
  // console.log({ lastnameError })
  // console.log({ emailError }) // E.g. 'Invalid email'
  // console.log({ ...error })
  const bgColor = "white"
  const headerTextColor = "black"
  const bgGradient = "linear(to-r, white, blackAlpha.200)"

  const handleChange = (v) => {
    console.log({ ...v })
  }

  const { isOpen, onClose, onToggle } = useDisclosure()
  return (
    <>
      <Button onClick={onToggle} m={2}>
        Open menu
      </Button>
      <CLJWizard
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        title="The Wizzer"
        schema={JobFormSchema}
        onSubmit={onSubmit}
        validator={validateForm}
      >
        {/* <TextFieldUtf isRequired type='text' name="firstname" label='First name' prefix="First name" error={firstnameError} />
        <TextFieldUtf isRequired type='text' name="lastname" label='Last name' prefix="Last name" error={lastnameError} />
        <TextFieldUtf isRequired type='text' name="email" label='Email' prefix="Email" error={emailError} /> */}
        <Input isRequired type="text" name="firstname" label="First name" />
        <Input isRequired type="text" name="lastname" label="Last name" />
        <Input isRequired type="text" name="email" label="Email" />
        {/* <TextFieldUtf isRequired name="firstname" prefix="First name" error={firstnameError} />
                <TextFieldUtf isRequired name="lastname" prefix="Last name" error={lastnameError} />
                <TextFieldUtf isRequired name="email" prefix="Email" error={emailError} /> */}
        {/* <Input type='text' name='title' placeholder='Title' />
                <Input type='date' name='start' placeholder='Start' />
                <Input type='time' name='end' placeholder='End' /> */}
      </CLJWizard>
      {/* <Modal isOpen={isOpen} onClose={onClose} size='md' scrollBehavior="inside">
                <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(2px) invert(10%)' />

                <ModalContent bg={bgColor}>
                    <ModalHeader
                        borderBottom='1px solid whiteAlpha.100'
                        textColor={headerTextColor}
                        bgGradient={bgGradient}
                    >
                        Header goes here
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody bg={bgColor}>
                        <Form
                            touched
                            onSubmit={onSubmit}
                            onChange={handleChange}
                            {...validation}
                        // onChange={onChange}
                        // initialState={{ firstname: "Bob", lastname: "Wiley", email: "" }}
                        >
                            <TextFieldUtf isRequired name="firstname" prefix="First name" error={firstnameError} />
                            <TextFieldUtf isRequired name="lastname" prefix="Last name" error={lastnameError} />
                            <TextFieldUtf isRequired name="email" prefix="Email" error={emailError} />
                            <Input type='checkbox' name='checker' defaultChecked={true} />

                            <SubmitButton>Submit</SubmitButton>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal> */}
    </>
  )
}

export default TestUtForm
