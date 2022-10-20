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
  const { jobId, jobStash, createJob, editJob, pickJob, refetchStashes } = useContext(headerContext)
  // const [jobId, setJobId] = useState<number>()
  const [job, setJob] = useState<Job>({} as Job)
  const [jobs, { refetch: refetchJobs }] = useQuery(
    getJobs,
    {
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
      // console.log(j)
      return j as Job
    })
  }, [jobId, jobs.jobs])

  return (
    <>
      {/* <JobModalForm
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
      /> */}

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
              <MenuItemOption value="all" onClick={() => pickJob(undefined)}>
                All jobs
              </MenuItemOption>
              <MenuDivider />
              {jobs.jobs.map((j, ii) => (
                <MenuItemOption key={ii} value={ii.toString()} onClick={() => pickJob(j.id)}>
                  {j.title}
                </MenuItemOption>
              ))}
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
          onClick={createJob}
        >
          New job
        </Button>
      </Flex>

      <pre>{JSON.stringify(job, null, 2)}</pre>
    </>
  )
}

export default JobPanel
