import { Routes } from "@blitzjs/next"
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
  Heading,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react"
import { Job, Prisma } from "@prisma/client"
import headerContext from "app/core/components/header/headerContext"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { addDays, format, getWeek } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import timeRange9_17 from "../helpers/timeRange9_17"

const formattedStart = (j: Job) => {
  if (j.start) return format(j.start, "Hmm")
  return ""
}
const sametime = (j: Job, t: number) => {
  return formattedStart(j) === t.toString()
}
interface HourViewProps extends Pick<Prisma.JobFindManyArgs, "orderBy"> {
  time: number
  jobs?: Job[]
  showHour?: boolean
  // isOpen: boolean
  // onOpen: () => void
  // onClose: () => void
}

const HourView = ({ time, jobs, showHour = true }: HourViewProps) => {
  const { pickJob } = useContext(headerContext)
  const router = useRouter()
  const filteredJobs = jobs?.filter((j) => sametime(j, time))
  const bgColors = ["red.50", "green.50", "blue.50"]
  const borderColors = ["red.200", "green.200", "blue.200"]

  return (
    <>
      {showHour && <Heading size="sm">{time}</Heading>}
      <VStack spacing={0} display="flex">
        {filteredJobs?.map((j, ii) => (
          <Tooltip key={ii} label="Job details">
            <Text
              ml={ii * 3}
              bgColor={bgColors[ii % 3]}
              borderColor={borderColors[ii % 3]}
              borderWidth={2}
              borderRadius={4}
              fontSize="xs"
              noOfLines={1}
              onClick={async () => {
                // pickJob(j.id) // "Not a function" error?
                await router.push(Routes.ShowCustomerPage({ customerId: j.customerId }))
              }}
              _hover={{ cursor: "pointer" }}
            >
              {j.title}
              <br />
              {`${format(j.start!, "HHmm")} - ${format(j.end!, "HHmm")}`}
            </Text>
          </Tooltip>
        ))}
      </VStack>
      {/* <Divider mt={4} /> */}
    </>
    // <Flex borderWidth={1} borderColor="blue.400" borderRadius={4} w="full">
    //   <Box bg="transparent" position="absolute">
    //     {timeRange9_17().map((t, ii) => (
    //       <Text key={ii}>{t}</Text>
    //     ))}
    //     {/* <Text textAlign="center" fontWeight="semibold">
    //       {format(date, "EEE, do LLL yy")}
    //     </Text> */}
    //     <Box bg="blue">
    //       {jobs?.map((j, ii) => (
    //         <>
    //           {/* onClick: Pick customer */}
    //           {/* onClick: Pick location */}
    //           {/* onClick: Pick job */}
    //           {/* If completed, opacity change */}
    //           <pre>{JSON.stringify(j, null, 2)}</pre>
    //         </>
    //       ))}
    //     </Box>
    //   </Box>
    // </Flex>
  )
}

export default HourView
