import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ username: "", email: "", password: "", role: "Admin" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("username")) {
              // This error comes from Prisma
              return { username: "This username is already being used" }
            } else if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="username" label="Username" placeholder="Username" />
        <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <LabeledTextField name="role" label="Role" disabled={true} placeholder="Role" />
      </Form>
    </div>
  )
}

export default SignupForm
