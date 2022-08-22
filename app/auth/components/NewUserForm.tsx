import { useMutation } from "@blitzjs/rpc"
import { Center, HStack, Spinner, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react"
import LabeledTextField from "app/core/components/LabeledTextField"
import ModalForm, { FORM_ERROR } from "app/core/components/ModalForm"
import { PromiseReturnType } from "blitz"
import { FC } from "react"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { FaLock } from "react-icons/fa"

type NewUserFormProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (user: PromiseReturnType<typeof signup>) => void
}

const NewUserForm: FC<NewUserFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [signupMutation] = useMutation(signup)

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      schema={Signup}
      title="Create new user"
      submitText="Create"
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
          <LabeledTextField name="role" label="Role" value="Admin" disabled={true} />
          <HStack>
            <Tag colorScheme="orange" flexShrink={0}>
              <TagLeftIcon as={FaLock} />
              <TagLabel>Mark this user as a user</TagLabel>
            </Tag>
          </HStack>
        </>
      )}
    />
  )
}

export default NewUserForm
