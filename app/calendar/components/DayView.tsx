import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react"
import findJobs from "app/jobs/queries/findJobs"
import getJobs from "app/jobs/queries/getJobs"

type DayViewProps = {
  date: Date
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}
const today = new Date()

const DayView = ({ date }: DayViewProps) => {
  // const [jobStarts] = useQuery(
  //   findJobs, { query: date },
  //   {
  //     suspense: true,
  //     refetchOnWindowFocus: false,
  //     staleTime: Infinity,
  //   }
  // )

  return (
    <Box borderWidth={2} borderColor="blue.400" borderRadius={4}>
      <Text fontWeight="semibold">{date.toDateString()}</Text>
      {/* <pre>{JSON.stringify(jobStarts, null, 2)}</pre> */}
    </Box>
  )
}

export default DayView
