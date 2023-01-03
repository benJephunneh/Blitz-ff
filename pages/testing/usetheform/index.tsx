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
import { useCallback, useMemo, useState } from "react"
import { Collection, Form, Input, useForm, useMultipleForm, useValidation } from "usetheform"
import { z } from "zod"
import ReactJson from "react-json-view"
import { zipObject } from "lodash"
import useCustomer from "app/customers/hooks/useCustomer"
import NoteFieldUtf from "app/core/components/forms/components/NoteFieldUtf"

const schemas = [CustomerFormSchema, LocationFormSchema, JobFormSchema]

// const validateForm = (v) => {
//   try {
//     fieldSchema.parse(v)
//   } catch (e) {
//     // console.log({ e })
//     if (e.errors[0].path === "") {
//       return { all: e.errors[0].message }
//     } else {
//       return e.errors.reduce((acc, errObj) => {
//         const namefield = errObj.path[0]
//         acc = { ...acc, [namefield]: errObj.message }
//         return acc
//       }, {})
//     }
//   }
// }

const TestUtForm: BlitzPage = () => {
  const { customer } = useCustomer({
    where: { firstname: "Jeff", lastname: "Davis" },
    select: {
      firstname: true,
      lastname: true,
      companyname: true,
      phone: true,
      email: true,
      notes: true,
    },
  })
  // const required = (v) => (v && v.trim() !== "" ? undefined : "Required")
  // const onChange = (e) => console.log("On change: ", e)
  const onSubmit = (e) => {
    console.log("On submit: ", e)
  }

  const initialState = useMemo(() => {
    return {
      customer: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        phone: undefined,
        notes: undefined,
      },
      location: {
        house: undefined,
        street: undefined,
        city: undefined,
        state: "FL",
        block: undefined,
        lost: undefined,
        parcel: undefined,
        notes: undefined,
      },
      job: {
        title: undefined,
        start: undefined,
        stop: undefined,
        completed: false,
        notes: undefined,
      },
    }
  }, [customer])
  // console.log({ ...initialState })

  const [formState, setFormState] = useState(initialState)
  const [wizardPage, setPage] = useState(1)
  const next = () => setPage((p) => ++p)
  const prev = () => setPage((p) => --p)
  const [getWizardState, wizard] = useMultipleForm((s) => updateJson(s))
  const { isOpen, onClose, onToggle } = useDisclosure()
  const updateJson = useCallback((s) => setFormState(s), [])

  const validateForm = (v) => {
    // console.log({ v })
    // console.log(schemas.at(wizardPage - 1)?.shape)
    try {
      schemas.at(wizardPage - 1)!.parse(v)
    } catch ({ errors }) {
      console.log({ ...errors })
      if (errors[0].path === "") return { all: errors[0].message }
      else
        return errors.reduce((acc, errObj) => {
          const namefield = errObj.path[0]
          acc = { ...acc, [namefield]: errObj.message }
          return acc
        }, {})
    }
  }

  const [{ error: errors, isValid }, validation] = useValidation([validateForm])
  console.log("errors", errors)
  // console.log({ ...validation })

  // const firstnameError = errors?.["firstname"] || errors?.["all"]
  // const lastnameError = errors?.["lastname"] || errors?.["all"]
  // const emailError = errors?.["email"] || errors?.["all"]
  // console.log({ firstnameError }) // E.g. 'Required'
  // console.log({ lastnameError })
  // console.log({ emailError }) // E.g. 'Invalid email'
  // console.log({ ...error })
  const [headerText, setHeaderText] = useState("Create customer")
  const bgColor = "white"
  const headerTextColor = "black"
  const bgGradient = "linear(to-r, white, blackAlpha.600)"

  const onInit = useCallback(
    (s) => {
      setFormState(initialState)
      setPage(1)
    },
    [initialState]
  )

  const onChange = useCallback((s) => {
    const [key] = Object.keys(s)

    setFormState((state) => {
      const obj = {
        ...state,
        [key!]: {
          ...state[key!],
          ...s[key!],
        },
      }
      return obj
    })
  }, [])

  return (
    <>
      <Button onClick={onToggle} m={2}>
        Open menu
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ sm: "md", lg: "xl" }}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px) invert(10%)" />

        <ModalContent bg={bgColor}>
          <ModalHeader
            borderBottom="1px solid whiteAlpha.100"
            textColor={headerTextColor}
            bgGradient={bgGradient}
          >
            {headerText}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody bg={bgColor} transition="1s ease-in">
            {wizardPage === 1 && (
              <Form
                touched
                onSubmit={onSubmit}
                onChange={onChange}
                onInit={onInit}
                initialState={initialState}
                {...validation}
              >
                <Collection object name="customer">
                  <TextFieldUtf
                    isRequired
                    name="firstname"
                    prefix="First name"
                    error={errors?.["firstname"] || errors?.["all"]}
                    colorScheme="red"
                  />
                  <TextFieldUtf
                    isRequired
                    name="lastname"
                    prefix="Last name"
                    error={errors?.["lastname"] || errors?.["all"]}
                  />
                  <TextFieldUtf
                    isRequired
                    name="companyname"
                    prefix="Company name"
                    error={errors?.["companyname"] || errors?.["all"]}
                  />
                  <TextFieldUtf
                    isRequired
                    name="email"
                    prefix="Email"
                    error={errors?.["email"] || errors?.["all"]}
                  />
                  <TextFieldUtf
                    isRequired
                    name="phone"
                    prefix="Phone"
                    error={errors?.["phone"] || errors?.["all"]}
                  />
                  <NoteFieldUtf
                    name="notes"
                    label="Notes"
                    error={errors?.["notes"] || errors?.["all"]}
                  />
                </Collection>

                <Button size="sm" colorScheme="blue" onClick={prev}>
                  Prev
                </Button>
                <Button size="sm" colorScheme="green" onClick={next}>
                  Next
                </Button>

                <SubmitButton>Submit</SubmitButton>
              </Form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <ReactJson src={formState} theme='rjv-default' /> */}
    </>
  )
}

export default TestUtForm
