import { BlitzPage } from "@blitzjs/next"
import { Button, Flex, useDisclosure } from "@chakra-ui/react"
import TaskForm from "app/tasks/components/TaskForm"

const TaskFormTest: BlitzPage = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()

  return (
    <Flex p={4}>
      <Button variant="solid" border="1px solid black" onClick={onToggle}>
        Open form
      </Button>

      <TaskForm
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        title="Test task form"
        onSubmit={console.log}
      />
    </Flex>
  )
}

export default TaskFormTest
