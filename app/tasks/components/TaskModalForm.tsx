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
  Tag,
  TagLabel,
} from "@chakra-ui/react"
import { Task } from "@prisma/client"
import createTask from "app/tasks/mutations/createTask"
import updateTask from "app/tasks/mutations/updateTask"
import { ReactNode, useCallback, useContext, useState } from "react"
import { TaskFormSchema } from "../validations"
import { Form, Input, useValidation } from "usetheform"
import Submit from "app/core/components/forms/usetheform/components/Submit"
import InputUtf from "app/core/components/forms/usetheform/components/InputUtf"
import TextareaUTF from "app/core/components/forms/usetheform/components/TextareaUTF"
import CheckboxUtf from "app/core/components/forms/usetheform/components/CheckboxUtf"
import { addHours, format } from "date-fns"
import headerContext from "app/core/components/header/headerContext"
import getTask from "../queries/getTask"
import getLocation from "app/locations/queries/getLocation"
import SwitchUtf from "app/core/components/forms/usetheform/components/SwitchUtf"

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
  // const { tasks } = useContext(headerContext)
  const [createTaskMutation] = useMutation(createTask)
  const [updateTaskMutation] = useMutation(updateTask)

  const [task, { refetch: refetchTask }] = useQuery(
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
  const notesError = error?.["notes"] || error?.["all"]
  const [completed, setCompleted] = useState(task ? task.completed : false)

  const initialState = {
    title: task ? task.title : undefined,
    completed,
    needBy: task ? format(task.needBy, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
    notes: task ? task.notes : undefined,
  }

  const bgColor = "white"
  const headerGradient = "linear(to-r, white, blackAlpha.200)"

  const onSubmit = async (v) => {
    // console.log('v', v)
    const { id, needBy: d, completed: trash, ...newTask } = v
    const offset = new Date().getTimezoneOffset()
    const needBy = addHours(new Date(d), offset / 60)

    let taskRet
    if (task) {
      taskRet = await updateTaskMutation({
        id: task.id,
        completed,
        needBy,
        ...newTask,
      })
    } else {
      taskRet = await createTaskMutation({
        completed,
        needBy,
        ...newTask,
      })
    }

    await refetchTask()
    return taskRet
  }

  const [formState, setFormState] = useState(initialState)
  // const updateJSON = useCallback(state => {
  //   console.log('formState', state)
  //   setFormState(state)
  // }, [])

  const switchChange = () => {
    setCompleted(!completed)
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
            // onChange={updateJSON}
            {...validation}
          >
            <Flex direction="column" mb={2}>
              <InputUtf
                isRequired={true}
                type="text"
                name="title"
                label="Task name"
                error={titleError}
              />
              <HStack justifyContent="space-between" alignItems="center">
                <InputUtf isRequired={false} type="date" name="needBy" label="Due by" />
                <HStack minW="fit-content" align="end">
                  <Tag colorScheme="blue" flexShrink={0}>
                    <TagLabel>Completed?</TagLabel>
                  </Tag>
                  <SwitchUtf name="completed" onChange={switchChange} />
                </HStack>
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
