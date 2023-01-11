import { BlitzPage } from "@blitzjs/next"
import { Button, Flex, useDisclosure } from "@chakra-ui/react"
import JobWizardForm from "app/jobs/components/JobWizardUtf"
import { addDays } from "date-fns"
import { useEffect, useRef, useState } from "react"
import ReactJson from "react-json-view"

const initialState = {
  title: "PO",
  completed: false,
  needsLocate: false,
  lineitems: [],
  start: addDays(new Date().setHours(9, 0, 0, 0), 1),
  end: addDays(new Date().setHours(17, 0, 0, 0), 1),
  notes: "Do the thing.",
}

const WhizTester: BlitzPage = () => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  const [jobject, onChange] = useState(initialState)
  // const jobject = useRef(initialState)
  // const onChange = (v: any) => {
  //   jobject.current = {
  //     ...jobject,
  //     ...v
  //   }
  // }

  // useEffect(() => {
  //   onChange(initialState)
  // }, [])

  console.log({ ...jobject })

  return (
    <Flex p={3} direction="column" gap={3}>
      <Button
        variant="outline"
        border="1px solid"
        borderColor="black"
        p={2}
        size="sm"
        onClick={onToggle}
        maxW="max-content"
      >
        Test form wizard
      </Button>

      <JobWizardForm
        formTitle="Whiz test"
        isOpen={isOpen}
        onClose={onClose}
        jobject={jobject}
        onChange={onChange}
      />

      {/* <ReactJson src={initialState} /> */}
    </Flex>
  )
}

export default WhizTester
