import { useMutation } from "@blitzjs/rpc"
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react"
import { Task } from "@prisma/client"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createTask from "app/tasks/mutations/createTask"
import updateTask from "app/tasks/mutations/updateTask"
import { ReactNode } from "react"
import { TaskFormSchema } from "../validations"
import { Form, Input, useValidation } from "usetheform"
import TextareaUTF from "./TextareaUTF"
import Submit from "app/core/components/forms/usetheform/Submit"

type TaskFormProps = {
  isOpen: boolean
  onClose: () => void
  size?: ModalProps["size"]
  title: string

  task?: Task
  children?: ReactNode
  onSubmit: () => void
  onSuccess?: (task: Task) => void
}

const TaskForm = ({
  isOpen,
  onClose,
  size,
  title,
  task,
  children,
  onSubmit,
  onSuccess,
}: TaskFormProps) => {
  // const { user: currentUser } = useCurrentUser()
  const [createTaskMutation] = useMutation(createTask)
  const [updateTaskMutation] = useMutation(updateTask)

  const validateForm = (v) => {
    try {
      TaskFormSchema.parse(v)
    } catch ({ errors }) {
      if (errors[0].path === "") return { all: errors[0].message }
      else
        return errors.reduce((acc, errObj) => {
          const namefield = errObj.path[0]
          acc = { ...acc, [namefield]: errObj.message }
        })
    }
  }

  const [{ error }, validation] = useValidation([validateForm])
  const titleError = error?.["title"] || error?.["all"]
  const notesError = error?.["notes"] || error?.["all"]

  const initialState = {
    title: task?.title ?? undefined,
    notes: task?.notes ?? undefined,
  }

  const bgColor = "white"
  const headerGradient = "linear(to-r, white, blackAlpha.200)"

  const handleSubmit = (v) => {
    console.log({ v })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px) invert(10%)" />

      <ModalContent>
        <ModalHeader borderBottom="1px solid" bgGradient={headerGradient}>
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Form
            touched
            initialState={initialState}
            onSubmit={console.log}
            onChange={console.log}
            {...validation}
          >
            <Flex direction="column">
              <Input type="text" name="title" placeholder="Task name" />
              <TextareaUTF />
            </Flex>

            <Submit>Submit</Submit>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TaskForm
