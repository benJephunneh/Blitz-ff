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
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Job, Prisma } from "@prisma/client"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { addDays, format, getWeek, isMonday } from "date-fns"
import Link from "next/link"
import { ShowJobTimeMatch } from "pages/calendar"
import { useEffect, useState } from "react"
import timeRange9_17 from "../helpers/timeRange9_17"
import HourView from "./HourView"

interface MondayProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  date: Date
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}
const today = new Date()

const Monday = ({ date, orderBy = { start: "asc" } }: MondayProps) => {
  const [jobStarts] = useQuery(
    findJobsByDate,
    {
      date,
      orderBy,
    },
    {
      enabled: isMonday(date),
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
  console.table({ ...jobStarts })

  return (
    <>
      {/* <Flex borderWidth={1} borderColor="blue.400" borderRadius='md' w="full"> */}
      <Box bg="transparent" position="relative">
        <HStack justify="space-evenly">
          <VStack align="start">
            <Text textAlign="center" fontWeight="semibold" bgColor="blackAlpha.100" align="start">
              {format(date, "EEE, do LLL yy")}
            </Text>
            {timeRange9_17().map((t, ii) => (
              <HourView key={ii} time={t} jobs={jobStarts} />
            ))}
          </VStack>
        </HStack>
      </Box>
      {/* </Flex> */}
    </>
  )
}

export default Monday
