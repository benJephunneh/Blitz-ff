import { useMutation } from "@blitzjs/rpc"
import {
  Center,
  HStack,
  ModalProps,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import ModalForm, { FORM_ERROR } from "app/core/components/ModalForm"
import { PromiseReturnType } from "blitz"
import { FC } from "react"
import signup from "../mutations/signup"
import { Login, Signup } from "../validations"
import { FaLock } from "react-icons/fa"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import login from "../mutations/login"
import { FormComponent } from "app/core/components/FormComponent"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { Customer } from "@prisma/client"

type LoginUserModalFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const LoginUserModalForm: FC<LoginUserModalFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const router = useRouter()
  const [loginMutation] = useMutation(login)
  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(loginMutation(values))
    })
  }
  const handleError = async (error) => {
    return {
      [FORM_ERROR]: `Something wint rong ${error.toString()}`,
    }
  }

  return (
    <ModalForm
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
          .then(() => onClose())
          // .then(() => router.push(Routes.Dashboard()))
          .catch((error) => handleError(error))
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
