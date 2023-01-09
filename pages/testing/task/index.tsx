import { BlitzPage } from "@blitzjs/next"
import { Button, Flex, useDisclosure } from "@chakra-ui/react"
import JobModalForm from "app/jobs/components/JobModalForm"
import TaskModalForm from "app/tasks/components/TaskModalForm"
import { useRef } from "react"

const TaskFormTest: BlitzPage = () => {
  const taskModalRef = useRef("task")
  const jobModalRef = useRef("job")
  const {
    isOpen: isTaskOpen,
    onClose: onTaskClose,
    onToggle: onTaskToggle,
  } = useDisclosure({ id: "task" })
  const {
    isOpen: isJobOpen,
    onClose: onJobClose,
    onToggle: onJobToggle,
  } = useDisclosure({ id: "job" })
  // const { getButtonProps: getTaskButtonProps, getDisclosureProps: getTaskDisclosureProps } = useDisclosure({ id: 'task' })
  // const { getButtonProps: getJobButtonProps, getDisclosureProps: getJobDisclosureProps } = useDisclosure({ id: 'job' })

  // const taskButtonProps = getTaskButtonProps()
  // const taskDisclosureProps = getTaskDisclosureProps()
  // const jobButtonProps = getJobButtonProps()
  // const jobDisclosureProps = getJobDisclosureProps()

  // console.log({ ...taskDisclosureProps })

  return (
    <Flex p={4}>
      <Button variant="solid" border="1px solid black" onClick={onTaskToggle}>
        Open task form
      </Button>
      <Button variant="solid" border="1px solid black" onClick={onJobToggle} ml={4}>
        Open job form
      </Button>

      <TaskModalForm
        // ref={taskModalRef}
        isOpen={isTaskOpen}
        onClose={onTaskClose}
        size="md"
        title="Test task form"
        onSuccess={console.log}
      />

      <JobModalForm
        customerId={733}
        locationId={1033}
        jobId={undefined}
        stashId={undefined}
        isOpen={isJobOpen}
        onClose={onJobClose}
        disableStash={true}
      />
    </Flex>
  )
}

export default TaskFormTest
