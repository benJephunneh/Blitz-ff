import { useMutation, useQuery } from "@blitzjs/rpc"
import { Box, Button, Flex, TabPanel } from "@chakra-ui/react"
import headerContext from "app/core/components/header/headerContext"
import db, { Job } from "db"
import { useContext, useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import getJobs from "../queries/getJobs"
import JobModalForm from "./JobModalForm"

const JobPanel = () => {
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

  const createJobMutation = useMutation(createJob)
  const updateJobMutation = useMutation(updateJob)

  const onSubmit = async (values) => {}

  const handleError = async (e) => {}

  return (
    <>
      <JobModalForm
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
        <Box>another</Box>

        <Button
          size="sm"
          py={0}
          variant="outline"
          borderStyle="dashed"
          borderWidth={1}
          borderColor="green"
          color="green"
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
