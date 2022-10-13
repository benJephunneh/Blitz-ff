import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react"
import headerContext from "app/core/components/header/headerContext"
import db, { Job } from "db"
import { useContext, useEffect, useState } from "react"
import { BsArrowDown, BsFileEarmarkArrowDown } from "react-icons/bs"
import { FaArrowDown, FaChevronDown, FaPlus } from "react-icons/fa"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import getJobs from "../queries/getJobs"
import JobModalForm from "./JobModalForm"

type JobPanelProps = {
  locationId?: number
}

const JobPanel = ({ locationId }: JobPanelProps) => {
  const { jobStash, refetchStashes } = useContext(headerContext)
  const [creatingJob, setCreatingJob] = useState(false)
  const [editingJob, setEditingJob] = useState(false)
  const [jobId, setJobId] = useState<number>()
  const [job, setJob] = useState<Job>()
  const [jobs, { refetch: refetchJobs }] = useQuery(
    getJobs,
    {},
    {
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    }
  )

  useEffect(() => {
    ;async () => {
      const j = await db.job.findFirst({ where: { id: jobId } })
      if (j) setJob(j)
    }
  }, [jobId])

  return (
    <>
      <JobModalForm
        locationId={locationId}
        job={editingJob ? job : undefined}
        jobStash={jobStash}
        isOpen={creatingJob || editingJob}
        onClose={() => {
          creatingJob && setCreatingJob(false)
          editingJob && setEditingJob(false)
        }}
        disableStash={editingJob}
        onSuccess={async (job) => {
          if (job) {
            if ("notes" in job) refetchStashes()
            else if (creatingJob) {
              setJobId(undefined)
              await refetchJobs()
            }
          }

          creatingJob && setCreatingJob(false)
          editingJob && setEditingJob(false)
        }}
      />

      <Flex justify="space-between">
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
            <MenuOptionGroup defaultValue="all" type="radio">
              <MenuItemOption value="all">All jobs</MenuItemOption>
              <MenuDivider />
              {jobs.jobs.map((j, ii) => (
                <MenuItemOption key={ii} value={ii.toString()}>
                  {job?.title}
                </MenuItemOption>
              ))}
              <MenuItemOption value="job1">Job 1</MenuItemOption>
              <MenuItemOption value="job2">Job 2</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        {/* <Box>Job list dropdown</Box> */}

        <Button
          size="sm"
          py={0}
          variant="outline"
          borderStyle="dashed"
          borderWidth={1}
          borderColor={useColorModeValue("green", "orange.200")}
          color={useColorModeValue("green", "orange.200")}
          leftIcon={<FaPlus size={10} />}
          onClick={() => setCreatingJob(true)}
        >
          New job
        </Button>
      </Flex>
    </>
  )
}

export default JobPanel
