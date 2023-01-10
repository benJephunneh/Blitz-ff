import { BlitzPage } from "@blitzjs/next"
import { Button, Flex, useDisclosure } from "@chakra-ui/react"
import JobWizardForm from "app/jobs/components/JobWizardUtf"

const WhizTester: BlitzPage = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()

  return (
    <Flex p={3}>
      <Button
        variant="outline"
        border="1px solid"
        borderColor="black"
        p={2}
        size="sm"
        onClick={onToggle}
      >
        Test form wizard
      </Button>

      <JobWizardForm formTitle="Whiz test" isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default WhizTester
