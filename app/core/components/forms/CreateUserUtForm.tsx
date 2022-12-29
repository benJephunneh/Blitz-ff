import { Collection, Form, Input, useField, useValidation } from "usetheform"
import { z } from "zod"
import TextField from "./components/TextField"
import TextFieldUtf from "./components/TextFieldUtf"

const preventNegativeNumber = (n: number, p: number) => (n <= 0 ? 0 : n)
const required = (v: string) => (v && v.trim() !== "" ? undefined : "Required")
const CreateUserUtForm = () => {
  const onChange = (e) => console.log("On change: ", e)
  const onSubmit = (e) => console.log("On submit: ", e)

  return (
    <Form onSubmit={onSubmit} onChange={onChange}>
      <TextFieldUtf
        name="firstname"
        label="First name"
        schema={z.object({ firstname: z.string() })}
      />
    </Form>
  )
}

export default CreateUserUtForm
