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
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Job, Prisma } from "@prisma/client"
import findJobsByDate from "app/jobs/queries/findJobsByDate"
import findJobs from "app/jobs/queries/findJobsByDate"
import findJobsByWeek from "app/jobs/queries/findJobsByWeek"
import findJobStartsByDate from "app/jobs/queries/findJobStartsByDate"
import getJobs from "app/jobs/queries/getJobs"
import { addDays, differenceInHours, format, getHours, getWeek } from "date-fns"
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
const shades = ["red.200", "green.200", "blue.200"]

const DayView = ({
  day,
  jobs,
  date = addDays(new Date(), 1),
  orderBy = { start: "asc" },
}: DayViewProps) => {
  const o9 = jobs.filter((j) => getHours(j.start!) == 9)
  const one0 = jobs.filter((j) => getHours(j.start!) == 10)
  const one1 = jobs.filter((j) => getHours(j.start!) == 11)
  const one2 = jobs.filter((j) => getHours(j.start!) == 12)
  const one3 = jobs.filter((j) => getHours(j.start!) == 13)
  const one4 = jobs.filter((j) => getHours(j.start!) == 14)
  const one5 = jobs.filter((j) => getHours(j.start!) == 15)
  const one6 = jobs.filter((j) => getHours(j.start!) == 16)
  const one7 = jobs.filter((j) => getHours(j.start!) == 17)

  return (
    <VStack alignSelf="start" justify="center" flexShrink={0}>
      <Grid>
        <GridItem rowSpan={1}>
          <Text textAlign="left" fontWeight="semibold" bgColor="blackAlpha.100" my={0}>
            {format(day, "EEE d")}
          </Text>
        </GridItem>
        {timeRange9_17().map((t, ii) => {
          return (
            <>
              {o9.map((j) => {
                return (
                  <>
                    {
                      ii === 0 && (
                        <GridItem
                          key={ii}
                          pl={ii * 3}
                          bg={shades[ii % 3]}
                          fontSize="xs"
                          rowSpan={differenceInHours(j.end!, j.start!)}
                        >
                          {j.title}
                        </GridItem>
                      )
                      // <HourView key={ii} time={t} jobs={jobs} showHour={false} />
                      // <>
                      //   <Text key={ii}>{t}</Text>
                      //   <ShowJobTimeMatch jobs={jobStarts} time={t} />
                      //   <Divider />
                      // </>
                    }
                  </>
                )
              })}
            </>
          )
        })}
      </Grid>
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
