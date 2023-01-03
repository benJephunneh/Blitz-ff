import { CustomerFormSchema } from "app/customers/validations"
import { Collection, Form, Input, useValidation } from "usetheform"

// type CustomerUTFormProps = {
//   onSubmit: (e: any) => void
// }
const CustomerUTForm = ({ ...props }) => {
  const validateForm = (v) => {
    try {
      CustomerFormSchema.parse(v)
    } catch (e) {
      if (e.errors[0].path === "") return { all: e.errors[0].message }
      else
        return e.errors.reduce((acc, errObj) => {
          const namefield = errObj.path[0]
          acc = { ...acc, [namefield]: errObj.message }
        })
    }
  }

  const [{ error: errors }, validation] = useValidation([validateForm])
  const firstnameError = errors?.["firstname"] || errors?.["all"]
  const lastnameError = errors?.["lastname"] || errors?.["all"]
  const companynameError = errors?.["companyname"] || errors?.["all"]
  const emailError = errors?.["email"] || errors?.["all"]
  const phoneError = errors?.["phone"] || errors?.["phone"]
  // console.log({ firstnameError }) // E.g. 'Required'
  // console.log({ lastnameError })
  // console.log({ emailError }) // E.g. 'Invalid email'
  // console.log({ ...error })
  const bgColor = "white"
  const headerTextColor = "black"
  const bgGradient = "linear(to-r, white, blackAlpha.200)"

  return (
    <Form {...props}>
      <Collection objectt name="customer">
        <Input isRequired type="text" name="firstname" prefix="First name" error={firstnameError} />
        <Input isRequired type="text" name="lastname" prefix="Last name" error={lastnameError} />
        <Input
          isRequired
          type="text"
          name="companyname"
          prefix="Company name"
          error={companynameError}
        />
        <Input isRequired type="text" name="email" prefix="Email" error={emailError} />
        <Input isRequired type="text" name="phone" prefix="Phone" error={phoneError} />
      </Collection>
    </Form>
  )
}

export default CustomerUTForm
