import { useMutation } from "@blitzjs/rpc"
import { Center, HStack, Spinner, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import ModalForm, { FORM_ERROR } from "app/core/components/ModalForm"
import { PromiseReturnType } from "blitz"
import { FC } from "react"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { FaLock } from "react-icons/fa"
import LabeledSelectField from "app/core/components/LabeledSelectField"

type NewUserModalFormProps = {
  isOpen: boolean
  submitText: string
  onClose: () => void
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
}

const NewUserModalForm: FC<NewUserModalFormProps> = ({
  isOpen,
  submitText,
  onClose,
  onSuccess,
}) => {
  const [signupMutation] = useMutation(signup)

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={Signup}
      title="Create new user"
      submitText={submitText}
      initialValues={{ username: "", password: "", email: "", role: "Admin" }}
      onSubmit={async (values) => {
        try {
          const user = await signupMutation(values)
          onSuccess?.(user)
        } catch (error) {
          if (error.code === "P2002" && error.meta?.target?.includes("username")) {
            return { username: "This username is already being used." }
          } else if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            return { email: "This email is already being used." }
          } else {
            return { [FORM_ERROR]: "Something wint rong:" + error.toString() }
          }
        }
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
