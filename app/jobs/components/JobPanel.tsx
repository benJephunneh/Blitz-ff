import { useQuery } from "@blitzjs/rpc"
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
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import EditorField from "app/core/components/editor/components/EditorField"
import NoteSubmission from "app/core/components/forms/NoteSubmission"
import headerContext from "app/core/components/header/headerContext"
import { validateZodSchema } from "blitz"
import { format, isPast, isSameDay, isSameMonth } from "date-fns"
import { Job } from "db"
import { useContext, useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { Form as FinalForm } from "react-final-form"
import { FaChevronDown, FaPlus } from "react-icons/fa"
import getJobs from "../queries/getJobs"
import { textNotes } from "../validations"

type Range = [Date | null, Date | null] | Date | null | undefined

const JobPanel = () => {
  const {
    locationId,
    jobId,
    jobStash,
    createJob,
    editJob,
    pickJob,
    refetchCustomer,
    refetchStashes,
  } = useContext(headerContext)
  // const [jobId, setJobId] = useState<number>()
  const [job, setJob] = useState<Job>({} as Job)
  const [jobs, { refetch: refetchJobs }] = useQuery(
    getJobs,
    {
      where: { locationId },
      orderBy: { start: "asc" },
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    }
  )

  useEffect(() => {
    setJob(() => {
      const j = jobs.jobs.find((j) => j.id === jobId)
      return j as Job
    })
  }, [jobId, jobs.jobs])

  const [range, setRange] = useState<Range>()
  useEffect(() => {
    if (job) setRange([job.start as Date, job.end as Date])
  }, [job])

  const headingColor = useColorModeValue("green", "khaki")
  const inactiveJobColor = "gray.400"

  const onSubmit = async (values) => {
    console.log("submitted on job panel")
  }

  return (
    <>
      <Flex justify="space-between" mb={4}>
        <HStack spacing={4}>
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
                <MenuItemOption value="all" onClick={() => pickJob(undefined)}>
                  All jobs
                </MenuItemOption>
                <MenuDivider />
                {jobs.jobs.map((j, ii) => (
                  <MenuItemOption value={jobId?.toString()} key={ii} onClick={() => pickJob(j.id)}>
                    {j.title}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          {job && (
            <Text
              fontSize="xl"
              fontWeight="semibold"
              textColor={headingColor}
              textOverflow="ellipsis"
            >
              {job.title}
            </Text>
          )}
        </HStack>

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
          >
            Edit job
          </Button>
          <Button
            size="sm"
            py={0}
            variant="outline"
            borderStyle="dashed"
            borderWidth={1}
            borderColor={useColorModeValue("green", "orange.200")}
            color={useColorModeValue("green", "orange.200")}
            leftIcon={<FaPlus size={10} />}
            onClick={createJob}
            borderLeftWidth={0}
            bg={useColorModeValue("white", "whiteAlpha.400")}
          >
            New job
          </Button>
        </ButtonGroup>
      </Flex>

      {job && (
        <>
          <Calendar value={range} />

          <Box h={4}>
            <NoteSubmission
              modelType="Job"
              onSuccess={async () => {
                refetchCustomer()
                await refetchJobs()
              }}
            />
          </Box>
        </>
      )}
      {!job && (
        <UnorderedList>
          {jobs.jobs.map((j, ii) => (
            <ListItem
              key={ii}
              onClick={() => pickJob(j.id)}
              textColor={isPast(j.start!) ? inactiveJobColor : "initial"}
            >
              {isSameMonth(j.start!, j.end!)
                ? isSameDay(j.start!, j.end!)
                  ? `${j.title}: ${format(j.start!, "HHmm")} - ${format(j.end!, "HHmm, d MMM")}`
                  : `${j.title}: ${format(j.start!, "d")} - ${format(j.end!, "d MMM")}`
                : `${j.title}: ${format(j.start!, "d MMM")} - ${format(j.end!, "d MMM")}`}
            </ListItem>
          ))}
        </UnorderedList>
      )}

      {/* <pre>{JSON.stringify(job, null, 2)}</pre> */}
    </>
  )
}

export default JobPanel
