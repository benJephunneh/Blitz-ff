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
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { format, getWeek } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"

type WeekViewProps = {
  weekNumber?: number
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}

const DayView = ({ weekNumber = getWeek(new Date(), { weekStartsOn: 1 }) - 1 }: WeekViewProps) => {
  const [jobsByWeek, { refetch: refetchJobsWeek }] = useQuery(
    findJobsByWeek,
    { weekNumber },
    { refetchOnWindowFocus: false }
  )
  // console.table({ ...jobsByWeek })

  return (
    <Flex>
      <Box borderWidth={1} borderColor="blue.400" borderRadius={4} w="full">
        {jobsByWeek &&
          jobsByWeek.map((j, ii) => (
            <>
              {/* onClick: Pick customer */}
              {/* onClick: Pick location */}
              {/* onClick: Pick job */}
              {/* If completed, opacity change */}
              <pre>{JSON.stringify(j, null, 2)}</pre>
            </>
          ))}
      </Box>
    </Flex>
  )
}

export default DayView
