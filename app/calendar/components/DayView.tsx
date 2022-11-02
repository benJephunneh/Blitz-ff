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
import { addDays, format, getWeek } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"

type DayViewProps = {
  day?: Date
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}
const today = new Date()

const DayView = ({ day = addDays(new Date(), 1) }: DayViewProps) => {
  // console.log({ day })
  const [jobStarts, { refetch }] = useQuery(
    findJobsByDate,
    {
      query: day,
      orderBy: { start: "asc" },
    },
    {
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )

  // const [jobsByWeek, { refetch: refetchJobsWeek }] = useQuery(
  //   findJobsByWeek,
  //   { weekNumber },
  //   { refetchOnWindowFocus: false }
  // )

  // useEffect(() => {
  //   refetch().catch(console.error)
  // }, [day])

  return (
    <Box borderWidth={1} borderColor="blue.400" borderRadius={4} w="full">
      <Text textAlign="center" fontWeight="semibold">
        {format(day, "EEE, do LLL yy")}
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
