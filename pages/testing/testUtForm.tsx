import { BlitzPage } from "@blitzjs/next"
import { Button, Container } from "@chakra-ui/react"
import TextFieldUtf from "app/core/components/forms/components/TextFieldUtf"
import { Form, useForm, useValidation } from "usetheform"
import { z } from "zod"

const fieldSchema = z.object({
  firstname: z.string(),
  // lastname: z.string(),
  // email: z.string().email(),
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
  const onSubmit = (e) => console.log("On submit: ", e)
  const [{ error }, validation] = useValidation([validateForm])

  const firstnameError = error?.["firstname"] || error?.["all"]
  // const lastnameError = error?.['lastname'] || error?.['all']
  // const emailError = error?.['email'] || error?.['all']
  // console.log({ isFirstNameValid }) // E.g. 'Required'
  // console.log({ isLastNameValid })
  // console.log({ isEmailValid }) // E.g. 'Invalid email'
  // console.log({ ...error })

  return (
    <Container>
      <Form
        touched
        {...validation}
        onSubmit={onSubmit}
        // onChange={onChange}
        initialState={{ email: "" }}
      >
        <TextFieldUtf
          isRequired={true}
          name="firstname"
          label="First name"
          error={firstnameError}
        />
        {/* <TextFieldUtf isRequired name="lastname" label="Last name" error={lastnameError} />
                <TextFieldUtf isRequired name="email" label="Email" prefix="Email" error={emailError} /> */}
        {/* <Button type="submit" disabled={!isValid || pristine}>Submit</Button> */}
        <Button type="submit">Submit</Button>
        {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
      </Form>
    </Container>
  )
}

export default TestUtForm
