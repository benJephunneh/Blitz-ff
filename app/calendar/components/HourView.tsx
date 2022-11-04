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
import { Job, Prisma } from "@prisma/client"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { addDays, format, getWeek } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"
import timeRange9_17 from "../helpers/timeRange9_17"

interface HourViewProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  hour: number
  jobs?: Job[]
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}
const today = new Date()

const HourView = ({ hour, jobs }: HourViewProps) => {
  // console.log({ hour })

  return (
    <Flex borderWidth={1} borderColor="blue.400" borderRadius={4} w="full">
      <Box bg="transparent" position="absolute">
        {timeRange9_17().map((t, ii) => (
          <Text key={ii}>{t}</Text>
        ))}
        {/* <Text textAlign="center" fontWeight="semibold">
          {format(date, "EEE, do LLL yy")}
        </Text> */}
        <Box bg="blue">
          {jobs?.map((j, ii) => (
            <>
              {/* onClick: Pick customer */}
              {/* onClick: Pick location */}
              {/* onClick: Pick job */}
              {/* If completed, opacity change */}
              <pre>{JSON.stringify(j, null, 2)}</pre>
            </>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default HourView
