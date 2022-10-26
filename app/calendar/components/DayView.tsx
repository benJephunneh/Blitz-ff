import { useQuery } from "@blitzjs/rpc"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react"
import getJobs from "app/jobs/queries/getJobs"

type DayViewProps = { date: Date }
const today = new Date()

const DayView = ({ date }: DayViewProps) => {
  const jobStarts = useQuery(getJobs, {
    where: {
      OR: [{ start: { equals: date } }, { end: { equals: date } }],
    },
  })

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Schedule</DrawerHeader>

        <DrawerBody>
          <Flex direction="column"></Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DayView
