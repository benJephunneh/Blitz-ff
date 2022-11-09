import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Job, Prisma } from "@prisma/client"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { addDays, format, getWeek } from "date-fns"
import Link from "next/link"
import { ShowJobTimeMatch } from "pages/calendar"
import { useEffect, useState } from "react"
import timeRange9_17 from "../helpers/timeRange9_17"
import HourView from "./HourView"

interface DayViewProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  day: Date //'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  date?: Date
  jobs: Job[]
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}
const today = new Date()

const DayView = ({
  day,
  jobs,
  date = addDays(new Date(), 1),
  orderBy = { start: "asc" },
}: DayViewProps) => {
  return (
    <VStack align="start">
      <Text textAlign="left" fontWeight="semibold" bgColor="blackAlpha.100" my={0}>
        {format(day, "EEE, do LLL yy")}
      </Text>
      {timeRange9_17().map((t, ii) => (
        <HourView key={ii} time={t} jobs={jobs} />
        // <>
        //   <Text key={ii}>{t}</Text>
        //   <ShowJobTimeMatch jobs={jobStarts} time={t} />
        //   <Divider />
        // </>
      ))}
      {/* <Box bg='blue'>
        {jobStarts &&
          jobStarts.map((j, ii) => (
            <>
              onClick: Pick customer
              onClick: Pick location
              onClick: Pick job
              If completed, opacity change
              <pre>{JSON.stringify(jobStarts, null, 2)}</pre>
            </>
          ))}
        </Box> */}
    </VStack>
  )
}

export default DayView
