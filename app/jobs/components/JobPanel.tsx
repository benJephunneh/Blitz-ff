import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Tooltip,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import EditorField from "app/core/components/editor/components/EditorField"
import NoteSubmission from "app/core/components/forms/NoteSubmission"
import headerContext from "app/core/components/header/headerContext"
import { validateZodSchema } from "blitz"
import { format, isPast, isSameDay, isSameMonth } from "date-fns"
import { Job, LineItem } from "db"
import { useContext, useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { Form as FinalForm } from "react-final-form"
import { FaChevronDown, FaPlus } from "react-icons/fa"
import updateJob from "../mutations/updateJob"
import getJobs from "../queries/getJobs"
import { JobType, textNotes } from "../validations"

export type Range = [Date | null, Date | null] | Date | null | undefined

const JobPanel = () => {
  const {
    locationId: lId,
    jobId,
    locationJobs,
    job,
    jobStash,
    createJob,
    editJob,
    pickJob,
    refetchCustomer,
    refetchJobs,
    refetchStashes,
  } = useContext(headerContext)
  // if (Array.isArray(jobs) && jobs.at(0)!.id > 0) console.table(jobs)
  const [updateJobMutation] = useMutation(updateJob)
  // const [jobId, setJobId] = useState<number>()
  // const [job, setJob] = useState<Job>({} as Job)
  // const [jobs, { refetch: refetchJobs }] = useQuery(
  //   getJobs,
  //   {
  //     where: { locationId },
  //     orderBy: [{ start: "asc" }, { end: "asc" }, { title: "asc" }],
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     // refetchInterval: 5000,
  //     // refetchIntervalInBackground: true,
  //     staleTime: Infinity,
  //   }
  // )

  // useEffect(() => {
  //   setJob(() => {
  //     const j = jobs.find((j) => j.id === jobId)
  //     return j as Job
  //   })
  // }, [jobId, jobs])

  // console.table({ ...job })
  // console.log({ jobId })

  // const [job, setJob] = useState(jobs?.find(({ id }) => id === jobId))
  // const [relatedJobs, setRelatedJobs] = useState<JobType[] | undefined>()
  // const job = locationJobs?.find((j) => j.id === jobId)
  const [range, setRange] = useState<Range>([job?.start ?? null, job?.end ?? null])

  // useEffect(() => {
  //   const filteredJobs = jobs?.filter(({ locationId }) => locationId === lId)
  //   setRelatedJobs(filteredJobs)
  // }, [jobs, lId])
  useEffect(() => {
    setRange([job?.start ?? null, job?.end ?? null])
  }, [job])
  // useEffect(() => {
  //   setJob(jobs?.find(({ id }) => id === jobId))
  // }, [jobs, jobId])

  const headingColor = useColorModeValue("green", "khaki")
  const inactiveJobColor = "gray.400"

  const toggleComplete = async () => {
    await updateJobMutation({ id: jobId!, completed: !job?.completed })
    refetchJobs()
    // console.log("submitted on job panel")
  }

  return (
    <>
      <Flex justify="space-between" mb={4} flexGrow={1}>
        <HStack spacing={4}>
          <Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                size="sm"
                variant="outline"
                rightIcon={<Icon as={FaChevronDown} />}
              >
                Job list
              </MenuButton>
              <MenuList>
                <MenuOptionGroup defaultValue={!jobId ? "all" : jobId.toString()} type="radio">
                  <MenuItemOption
                    value="all"
                    onClick={() => {
                      pickJob(undefined)
                      // setJob(undefined)
                    }}
                  >
                    All jobs
                  </MenuItemOption>
                  <MenuDivider />
                  {locationJobs?.map((j, ii) => (
                    <MenuItemOption value={j.id.toString()} key={ii} onClick={() => pickJob(j.id)}>
                      {j.title}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Box>
          {job && (
            <Text
              fontSize="xl"
              fontWeight="semibold"
              textColor={headingColor}
              textOverflow="ellipsis"
            >
              {job?.title}
            </Text>
          )}
        </HStack>

        <Button
          size="sm"
          py={0}
          variant="outline"
          bg={useColorModeValue("blackAlpha.200", "blackAlpha.400")}
          borderColor="whiteAlpha.50"
          onClick={toggleComplete}
          disabled={!jobId}
        >
          {job?.completed ? "Mark incomplete" : "Mark complete"}
          {/* Mark complete */}
        </Button>
        <ButtonGroup isAttached>
          <Button
            size="sm"
            py={0}
            variant="outline"
            borderWidth={1}
            borderRightWidth={0}
            bg={useColorModeValue("blackAlpha.200", "blackAlpha.400")}
            borderColor="whiteAlpha.50"
            onClick={editJob}
            disabled={!jobId}
          >
            Edit job
          </Button>
          <Button
            size="sm"
            py={0}
            variant="outline"
            borderStyle="dashed"
            borderWidth={1}
            borderColor={useColorModeValue("green", "gray.500")}
            color={useColorModeValue("green", "orange.200")}
            leftIcon={<FaPlus size={10} />}
            onClick={createJob}
            borderLeftWidth={0}
            bg={useColorModeValue("white", "transparent")}
          >
            New job
          </Button>
        </ButtonGroup>
      </Flex>

      {job && (
        <HStack>
          <Calendar value={range} />

          <Box h={8} alignSelf="start">
            <NoteSubmission
              modelType="Job"
              onSuccess={async () => {
                refetchCustomer()
                // await refetchJob()
                // await refetchJobs()
              }}
            />
          </Box>
          {/* <pre>{JSON.stringify(job, null, 2)}</pre> */}
        </HStack>
      )}
      {!job && (
        <UnorderedList>
          {locationJobs?.map((j, ii) => (
            <Tooltip key={ii} label={j.title}>
              <ListItem
                // key={ii}
                onClick={() => {
                  pickJob(j.id)
                  // setJob(j)
                }}
                textColor={isPast(j.start!) ? inactiveJobColor : "initial"}
                _hover={{ cursor: "pointer" }}
              >
                {j.start === null
                  ? `${j.title}: unscheduled`
                  : isSameMonth(j.start!, j.end!)
                    ? isSameDay(j.start!, j.end!)
                      ? `${j.title}: ${format(j.start!, "HHmm")} - ${format(j.end!, "HHmm, d MMM")}`
                      : `${j.title}: ${format(j.start!, "d")} - ${format(j.end!, "d MMM")}`
                    : `${j.title}: ${format(j.start!, "d MMM")} - ${format(j.end!, "d MMM")}`}
              </ListItem>
            </Tooltip>
          ))}
        </UnorderedList>
      )}

      {/* <pre>{JSON.stringify(job, null, 2)}</pre> */}
    </>
  )
}

export default JobPanel
