import { useMutation, useQuery } from "@blitzjs/rpc"
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
import { ReactNode, useContext } from "react"
import { TaskFormSchema } from "../validations"
import { Form, Input, useValidation } from "usetheform"
import Submit from "app/core/components/forms/usetheform/Submit"
import InputUtf from "app/core/components/forms/usetheform/components/InputUtf"
import TextareaUTF from "app/core/components/forms/usetheform/components/TextareaUTF"
import CheckboxUtf from "app/core/components/forms/usetheform/components/CheckboxUtf"
import { addHours, format } from "date-fns"
import headerContext from "app/core/components/header/headerContext"
import getTask from "../queries/getTask"
import getLocation from "app/locations/queries/getLocation"

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

  taskId?: number
  children?: ReactNode
  onSuccess?: (task: Task) => void
}

const TaskModalForm = ({
  isOpen,
  onClose,
  size,
  title,
  taskId,
  children,
  onSuccess,
}: TaskModalFormProps) => {
  // const { user: currentUser } = useCurrentUser()
  const { tasks } = useContext(headerContext)
  const [createTaskMutation] = useMutation(createTask)
  const [updateTaskMutation] = useMutation(updateTask)

  const [task] = useQuery(
    getTask,
    {
      where: { id: taskId },
    },
    {
      enabled: !!taskId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  const [{ error }, validation] = useValidation([validateForm])
  const titleError = error?.["title"] || error?.["all"]
  const completedError = error?.["completed"] || error?.["all"]
  const needbyError = error?.["needBy"] || error?.["all"]
  const notesError = error?.["notes"] || error?.["all"]

  console.log({ ...task })

  const initialState = {
    title: task?.title ?? undefined,
    completed: task?.completed ?? false,
    needBy: task ? format(task.needBy, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
    notes: task?.notes ?? undefined,
  }
  // console.log({ initialState })

  const bgColor = "white"
  const headerGradient = "linear(to-r, white, blackAlpha.200)"

  const onSubmit = async (v) => {
    const { id, needBy: d, ...newTask } = v
    // console.log('onSubmit:', v)
    const offset = new Date().getTimezoneOffset()
    // console.log('offset', offset)
    const needBy = addHours(new Date(d), offset / 60)
    // console.log('needBy', needBy)

    let taskRet
    if (task) {
      taskRet = await updateTaskMutation({
        id: task.id,
        needBy,
        ...newTask,
      })
    } else {
      taskRet = await createTaskMutation({
        needBy,
        ...newTask,
      })
    }

    return taskRet
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(2px) invert(10%)" />

      <ModalContent pb={1}>
        <ModalHeader borderBottom="1px solid" bgGradient={headerGradient}>
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Form
            touched
            initialState={initialState}
            onSubmit={(v) => {
              onSubmit(v).then(onSuccess).catch(console.error)
            }}
            onChange={console.log}
            {...validation}
          >
            <Flex direction="column" mb={2}>
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
