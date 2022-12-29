import { BlitzPage } from "@blitzjs/next"
import { Button, Container } from "@chakra-ui/react"
import TextFieldUtf from "app/core/components/forms/components/TextFieldUtf"
import { Form, useForm, useValidation } from "usetheform"
import { z } from "zod"

const fieldSchema = z.object({ email: z.string().email() })
const isFormValid = (v) => {
  try {
    fieldSchema?.parse(v)
  } catch (e) {
    console.log({ e })
    if (e.errors[0].path === "") {
      return { all: e.errors[0].message }
    } else {
      return e.errors.reduce((acc, errObj) => {
        const namefield = errObj.path[0]
        acc = { ...acc, [namefield]: errObj.message }
        return acc
      })
    }
  }
}

const TestUtForm: BlitzPage = () => {
  const onChange = (e) => console.log("On change: ", e)
  const onSubmit = (e) => console.log("On submit: ", e)
  const required = (v) => (v && v.trim() !== "" ? undefined : "Required")
  const [status, validation] = useValidation([isFormValid])
  // const { isValid, pristine } = useForm()
  const isEmailValid = status.error?.["email"] || status.error?.["all"]
  console.log({ ...status })

  return (
    <Container>
      <Form
        touched
        {...validation}
        onSubmit={onSubmit}
        onChange={onChange}
        initialState={{ email: "" }}
      >
        <TextFieldUtf name="email" label="Email" prefix="Email" error={isEmailValid} />
        {/* <Button type="submit" disabled={!isValid || pristine}>Submit</Button> */}
        <Button type="submit">Submit</Button>
        {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
      </Form>
    </Container>
  )
}

export default TestUtForm
