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
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { format } from "date-fns"
import Link from "next/link"
import { useEffect } from "react"

type DayViewProps = {
  date: Date
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}
const today = new Date()

const DayView = ({ date }: DayViewProps) => {
  // console.log({ date })
  const [jobStarts, { refetch }] = useQuery(
    findJobsByDate,
    {
      query: date,
      orderBy: { start: "asc" },
    },
    {
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )

  // useEffect(() => {
  //   refetch().catch(console.error)
  // }, [date])

  return (
    <Box borderWidth={1} borderColor="blue.400" borderRadius={4} w="full">
      <Text textAlign="center" fontWeight="semibold">
        {format(date, "EEE, do LLL yy")}
      </Text>
      {jobStarts &&
        jobStarts.map((j, ii) => (
          <>
            {/* onClick: Pick customer */}
            {/* onClick: Pick location */}
            {/* onClick: Pick job */}
            {/* If completed, opacity change */}
            <pre>{JSON.stringify(jobStarts, null, 2)}</pre>
          </>
        ))}
    </Box>
  )
}

export default DayView
