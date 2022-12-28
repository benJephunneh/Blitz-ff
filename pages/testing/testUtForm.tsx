import { BlitzPage } from "@blitzjs/next"
import { Button, Container } from "@chakra-ui/react"
import TextFieldUtf from "app/core/components/forms/components/TextFieldUtf"
import { Form, useValidation } from "usetheform"
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
  const isEmailValid = status.error?.["email"] || status.error?.["all"]

  return (
    <Container>
      <Form touched {...validation} onSubmit={onSubmit} onChange={onChange}>
        {" "}
        {/* initialState={{ email: 'asdf@asdf.com' }}> */}
        <TextFieldUtf
          name="email"
          label="Email"
          prefix="Email"
          schema={z.object({ email: z.string().email() })}
          error={status.error}
        />
        <Button type="submit">Submit</Button>
        {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
      </Form>
    </Container>
  )
}

export default TestUtForm
