import { useMutation } from "@blitzjs/rpc"
import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react"
import { Task } from "@prisma/client"
import createTask from "app/tasks/mutations/createTask"
import updateTask from "app/tasks/mutations/updateTask"
import { ReactNode } from "react"
import { TaskFormSchema } from "../validations"
import { Form, Input, useValidation } from "usetheform"
import Submit from "app/core/components/forms/usetheform/Submit"
import InputUtf from "app/core/components/forms/usetheform/components/InputUtf"
import TextareaUTF from "app/core/components/forms/usetheform/components/TextareaUTF"
import CheckboxUtf from "app/core/components/forms/usetheform/components/CheckboxUtf"
import { format } from "date-fns"

const validateForm = (v) => {
  try {
    TaskFormSchema.omit({ completed: true, needBy: true }).parse(v)
  } catch ({ errors }) {
    if (errors[0].path === "") {
      return { all: errors[0].message }
    } else {
      return errors.reduce((acc, errObj) => {
        const namefield = errObj.path[0]
        acc = { ...acc, [namefield]: errObj.message }
        return acc
      }, {})
    }
  }
}

type TaskModalFormProps = {
  isOpen: boolean
  onClose: () => void
  size?: ModalProps["size"]
  title: string

  task?: Task
  children?: ReactNode
  onSubmit: () => void
  onSuccess?: (task: Task) => void
}

const TaskModalForm = ({
  isOpen,
  onClose,
  size,
  title,
  task,
  children,
  onSubmit,
  onSuccess,
}: TaskModalFormProps) => {
  // const { user: currentUser } = useCurrentUser()
  const [createTaskMutation] = useMutation(createTask)
  const [updateTaskMutation] = useMutation(updateTask)

  const [{ error }, validation] = useValidation([validateForm])
  const titleError = error?.["title"] || error?.["all"]
  const completedError = error?.["completed"] || error?.["all"]
  const needbyError = error?.["needBy"] || error?.["all"]
  const notesError = error?.["notes"] || error?.["all"]

  const initialState = {
    title: task?.title ?? undefined,
    completed: task?.completed ?? false,
    needBy: task?.needBy ?? format(new Date(), "yyyy-MM-dd"),
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
              {/* <Input type="text" name="title" placeholder="Task name" /> */}
              <InputUtf
                isRequired={true}
                type="text"
                name="title"
                label="Task name"
                error={titleError}
              />
              <HStack justifyContent="space-between">
                <InputUtf
                  isRequired={false}
                  type="date"
                  name="needBy"
                  label="Due by"
                  // error={needbyError}
                />
                <Box minW="fit-content">
                  <CheckboxUtf
                    isRequired={false}
                    type="checkbox"
                    name="completed"
                    label="Task complete?"
                    // error={completedError}
                  />
                </Box>
              </HStack>
              <TextareaUTF isRequired={true} name="notes" label="Task notes" error={notesError} />
            </Flex>

            <Submit>Submit</Submit>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TaskModalForm
