import { useMutation } from "@blitzjs/rpc"
import ModalForm, { FORM_ERROR } from "app/core/components/forms/ModalForm"
import { PromiseReturnType } from "blitz"
import { FC } from "react"
import { Login } from "../validations"
import login from "../mutations/login"
import { useRouter } from "next/router"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import { useToast } from "@chakra-ui/react"

type LoginUserModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const LoginUserModalForm: FC<LoginUserModalFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const router = useRouter()
  const toast = useToast()
  const [loginMutation] = useMutation(login)

  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(loginMutation(values))
    })
  }

  const handleError = async (error) => {
    toast({
      title: "Invalid username and/or password.",
      status: "error",
    })
    onClose()

    return {
      [FORM_ERROR]: `Something wint rong ${error.toString()}`,
    }
  }

  return (
    <ModalForm
      disableStash={true}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={Login}
      title="Log in"
      submitText="Go"
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        onSubmit(values)
          .then((user) => onSuccess?.(user!))
          .then(onClose)
          // .then(() => router.push(Routes.Dashboard()))
          .catch(handleError)
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
