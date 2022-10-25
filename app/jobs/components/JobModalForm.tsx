import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import { JobFormSchema, JobSkeleton, textNotes } from "../validations"
import { ModalProps, Text, useColorModeValue } from "@chakra-ui/react"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import getJob from "../queries/getJob"
import { Job, User } from "db"
import EditorField from "app/core/components/editor/components/EditorField"
import { useState } from "react"
import deleteStash from "app/stashes/mutations/deleteStash"
import createStash from "app/stashes/mutations/createStash"
import updateStash from "app/stashes/mutations/updateStash"
import { LabeledDateField } from "app/calendar/components/LabeledDateField"
import getStash from "app/stashes/queries/getStash"
import TextAreaField from "app/core/components/forms/components/TextAreaField"

type JobModalFormProps = {
  locationId?: number
  jobId?: number
  // job?: Job
  stashId?: number
  // jobStash?: JobStash
  disableStash?: boolean
  // locationId?: number
  isOpen: boolean
  onClose: () => void
  onSuccess?: (job: Job) => void
  props?: Partial<ModalProps>
}

const JobModalForm = ({
  locationId,
  jobId,
  stashId,
  // job,
  // jobStash,
  disableStash,
  // locationId,
  isOpen,
  onClose,
  onSuccess,
  ...props
}: JobModalFormProps) => {
  const [newJobMutation] = useMutation(createJob)
  const [updateJobMutation] = useMutation(updateJob)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)
  const [user, setUser] = useState<User>()
  const [calendarValue, onCalendarChange] = useState(new Date())

  const stashType = "Job"
  const stashFootnoteColor = useColorModeValue("red", "cyan.200")

  // useEffect(() => {
  //   ; async () => {
  //     if (jobStash) {
  //       const u = await db.user.findFirst({ where: { id: jobStash.userId } })
  //       if (u) setUser(u)
  //     }
  //   }
  // }, [jobStash])

  const [job, { refetch: refetchJob }] = useQuery(
    getJob,
    {
      id: jobId,
    },
    {
      suspense: !!jobId,
      enabled: !!jobId,
      refetchOnWindowFocus: false,
    }
  )

  // const [location] = useQuery(getLocation, {
  //   where: {
  //     id: locationId,
  //   },
  // })

  const [jobStash] = useQuery(
    getStash,
    {
      id: stashId,
      stashType,
    },
    {
      suspense: !!stashId,
      enabled: !!stashId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values))
    const { notes, stashing, range, ...formSubmission } = values
    const start = range?.at(0).setHours(9, 0, 0, 0)
    const end = range?.at(1).setHours(17, 0, 0, 0)
    formSubmission["start"] = new Date(start)
    formSubmission["end"] = new Date(end)

    let jobRet
    if (stashing) {
      console.log("Stashing...")
      if (jobStash) {
        jobRet = await updateStashMutation({
          id: jobStash.id,
          stashType,
          job: formSubmission,
          notes,
        })
      } else {
        jobRet = await createStashMutation({
          locationId,
          stashType,
          job: formSubmission,
          notes,
        })
      }
    } else {
      console.log("Jobbing...")
      if (job) {
        jobRet = updateJobMutation({
          id: job.id,
          notes,
          ...formSubmission,
        })
        refetchJob().catch((e) => console.log(e.message))
      } else {
        jobRet = newJobMutation({
          locationId,
          notes,
          ...formSubmission,
        })
        if (jobStash && jobRet) {
          await deleteStashMutation({
            id: jobStash.id,
            stashType,
          })
        }
      }
    }

    return jobRet
  }

  const handleError = (error) => {
    console.log(`Error doing something with job modal: ${error.toString()}`)
    return {
      [FORM_ERROR]: `Job modal error: ${error.toString()}`,
    }
  }

  // const [startDateTime, setStartDateTime] = useState(addDays(new Date().setHours(9, 0, 0, 0), 1))
  // const [endDateTime, setEndDateTime] = useState(addDays(new Date().setHours(17, 0, 0, 0), 1))
  const start = jobStash?.start || job?.start || undefined
  const end = jobStash?.end || job?.end || undefined

  const initialValues = {
    title: jobStash?.title || job?.title || undefined,
    range: start && end ? [start, end] : undefined,
    notes: jobStash ? JSON.parse(jobStash.notes) : job?.notes ? JSON.parse(job.notes) : null,
  }

  return (
    <ModalForm
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      disableStash={disableStash}
      schema={JobFormSchema}
      title={job ? "Edit job" : "New job"}
      submitText={job ? "Update" : "Create"}
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values)
          .then((job) => onSuccess?.(job))
          .catch((e) => handleError(e))
      }}
      render={() => (
        <>
          <LabeledTextField name="title" label="Title" />
          {/* <LabeledTextField name="start" label="Start date/time" /> */}
          {/* <LabeledTextField name="end" label="End date/time" /> */}
          <LabeledDateField name="range" label="Date range" start={start} end={end} />
          {/* <LabeledDateField name="end" label="End" initialDate={endDateTime} /> */}
          {/* <LabeledDateRangeField name='dateRange' label='Date range' /> */}
          {/* <EditorField
            name="notes"
            fontSize="md"
            label="Stash notes"
            features={{
              heading: true,
              horizontalRule: true,
            }}
          /> */}
          <TextAreaField name="notes" label="Notes" placeholder="Add notes about this job..." />
          {jobStash && (
            <Text fontSize="xs" color={stashFootnoteColor}>
              Stashed by {user?.username}
            </Text>
          )}
        </>
      )}
      {...props}
    />
  )
}

export default JobModalForm
