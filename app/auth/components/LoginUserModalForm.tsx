import { useMutation } from "@blitzjs/rpc"
import { Center, HStack, Spinner, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import ModalForm, { FORM_ERROR } from "app/core/components/ModalForm"
import { PromiseReturnType } from "blitz"
import { FC } from "react"
import signup from "../mutations/signup"
import { Login, Signup } from "../validations"
import { FaLock } from "react-icons/fa"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import login from "../mutations/login"

type LoginUserModalFormProps = {
  isOpen: boolean
  submitText: string
  onClose: () => void
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
}

const LoginUserModalForm: FC<LoginUserModalFormProps> = ({
  isOpen,
  submitText,
  onClose,
  onSuccess,
}) => {
  const [loginMutation] = useMutation(login)

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={Login}
      title="Create new user"
      submitText={submitText}
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const user = await loginMutation(values)
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
        </>
      )}
    />
  )
}

export default LoginUserModalForm
