import { useMutation } from "@blitzjs/rpc"
import ModalForm, { FORM_ERROR } from "app/core/components/forms/ModalForm"
import { PromiseReturnType } from "blitz"
import { FC } from "react"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { useRouter } from "next/router"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import LabeledSelectField from "app/core/components/forms/LabeledSelectField"

type NewUserModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
}

const NewUserModalForm: FC<NewUserModalFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const router = useRouter()
  const [signupMutation] = useMutation(signup)
  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(signupMutation(values))
    })
  }
  const handleError = async (error) => {
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      return { username: "This username is already being used." }
    } else if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { email: "This email is already being used." }
    } else {
      return { [FORM_ERROR]: "Something wint rong:" + error.toString() }
    }
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={Signup}
      title="Create new user"
      submitText="Create"
      initialValues={{ username: "", email: "", password: "", role: "Admin" }}
      onSubmit={async (values) => {
        onSubmit(values)
          .then((user) => onSuccess?.(user!))
          .then(() => onClose())
          .catch((error) => handleError(error))
      }}
      render={() => (
        <>
          <LabeledTextField name="username" label="Username" />
          <LabeledTextField name="password" label="Password" type="password" />
          <LabeledTextField name="email" label="Email" type="email" />
          <LabeledSelectField name="role" label="Role" defaultValue="Admin">
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
            <option value="Tech">Tech</option>
          </LabeledSelectField>
        </>
      )}
    />
  )
}

export default NewUserModalForm
