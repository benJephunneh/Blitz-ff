import { Form, FormProps } from "app/core/components/forms/Form"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/forms/Form"

export function CustomerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="firstname" label="First name" placeholder="First name" />
      <LabeledTextField name="lastname" label="Last name" placeholder="Last name" />
    </Form>
  )
}
