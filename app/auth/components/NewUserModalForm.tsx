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
import { FC, ReactNode } from "react"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { FaLock } from "react-icons/fa"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { PropsWithoutRef } from "react"
import { FormComponent } from "app/core/components/FormComponent"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

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
          // .then((user) => router.push(Routes.ProfilePage({ username: user!.username })))
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
