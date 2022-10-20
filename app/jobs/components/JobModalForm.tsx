import { useMutation, useQuery } from "@blitzjs/rpc"
import { PromiseReturnType } from "blitz"
import { FORM_ERROR } from "final-form"
import { CreateJob, CreateJobStash } from "../validations"
import { ModalProps, Text, useColorModeValue } from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import getJob from "../queries/getJob"
import db, { Job, JobStash, User } from "db"
import getLocation from "app/locations/queries/getLocation"
import EditorField from "app/core/components/editor/components/EditorField"
import { useEffect, useState } from "react"
import deleteStash from "app/stashes/mutations/deleteStash"
import createStash from "app/stashes/mutations/createStash"
import updateStash from "app/stashes/mutations/updateStash"
import { Calendar } from "react-calendar"
import { LabeledDateField } from "app/calendar/components/LabeledDateField"
import { addDays, formatRelative } from "date-fns"
import getStash from "app/stashes/queries/getStash"
import { LabeledDateRangeField } from "app/calendar/components/LabeledDateRangeField"

import "react-calendar/dist/Calendar.css"
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css"

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

  const [job, { isLoading }] = useQuery(
    getJob,
    { id: jobId },
    { suspense: false, enabled: !!jobId }
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
    const { notes, ...formSubmission } = values

    let jobRet
    if (values.stashing) {
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
      if (job) {
        jobRet = updateJobMutation({
          id: job.id,
          ...values,
        })
      } else {
        jobRet = newJobMutation({
          locationId,
          ...values,
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

  const [startDateTime, setStartDateTime] = useState(addDays(new Date().setHours(9, 0, 0, 0), 1))
  const [endDateTime, setEndDateTime] = useState(addDays(new Date().setHours(17, 0, 0, 0), 1))
  const initialValues = {
    title: jobStash?.title || job?.title || undefined,
    start: jobStash?.start || job?.start || undefined,
    end: jobStash?.end || job?.end || undefined,
    notes: jobStash ? JSON.parse(jobStash.notes) : job?.notes ? JSON.parse(job.notes) : null,
  }

  return (
    <ModalForm
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      disableStash={disableStash}
      schema={CreateJobStash}
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
          <LabeledDateField name="start" label="Start" initialDate={startDateTime} />
          <LabeledDateField name="end" label="End" initialDate={endDateTime} />
          {/* <LabeledDateRangeField name='dateRange' label='Date range' /> */}
          <EditorField
            name="notes"
            fontSize="md"
            label="Stash notes"
            features={{
              heading: true,
              horizontalRule: true,
            }}
          />
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
