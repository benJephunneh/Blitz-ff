import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import { JobFormSchema, JobSkeleton, textNotes } from "../validations"
import { Box, Grid, GridItem, HStack, ModalProps, Text, useColorModeValue } from "@chakra-ui/react"
import ModalForm from "app/core/components/forms/ModalForm"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"
import getJob from "../queries/getJob"
import db, { Job, User } from "db"
import EditorField from "app/core/components/editor/components/EditorField"
import { useState } from "react"
import deleteStash from "app/stashes/mutations/deleteStash"
import createStash from "app/stashes/mutations/createStash"
import updateStash from "app/stashes/mutations/updateStash"
import { LabeledDateField } from "app/calendar/components/LabeledDateField"
import getStash from "app/stashes/queries/getStash"
import TextAreaField from "app/core/components/forms/components/TextAreaField"
import DayView from "app/calendar/components/DayView"
import { Range } from "./JobPanel"
import getJobs from "../queries/getJobs"
import {
  addBusinessDays,
  addDays,
  getWeek,
  isFriday,
  isMonday,
  lastDayOfWeek,
  previousMonday,
  startOfWeek,
  subDays,
  weeksToDays,
} from "date-fns"
import { Ctx } from "@blitzjs/next"
import findJobsByWeek from "../queries/findJobsByWeek"

const handleDayClick = async (d: Date) => {
  const dayBefore = subDays(d, 1)
  const dayAfter = addDays(d, 1)

  const jobs = await db.job.findMany({
    where: {
      AND: [{ start: { gte: dayBefore } }, { end: { lte: dayAfter } }],
    },
  })

  return jobs
}

type JobModalFormProps = {
  customerId?: number
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
  customerId,
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
  const [createJobMutation] = useMutation(createJob)
  const [updateJobMutation] = useMutation(updateJob)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)
  const [user, setUser] = useState<User>()
  const [calendarValue, onCalendarChange] = useState(new Date())

  const stashType = "Job"
  const stashFootnoteColor = useColorModeValue("red", "cyan.200")

  const [job, { refetch: refetchJob }] = useQuery(
    getJob,
    {
      where: { id: jobId },
    },
    {
      enabled: !!jobId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  const [jobStash] = useQuery(
    getStash,
    {
      id: stashId,
      stashType,
    },
    {
      enabled: !!stashId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )

  const today = new Date()
  let m: Date
  if (isMonday(today)) m = today
  else m = previousMonday(today)
  const [monday, setMonday] = useState<Date | null>(m)
  const [friday, setFriday] = useState<Date | null>(addDays(m, 4))

  if (job) {
    if (isMonday(job.start!)) {
      setMonday(job.start)
      setFriday(addDays(job.start!, 4))
    } else {
      const m = previousMonday(job.start!)
      setMonday(m)
      setFriday(addDays(m, 4))
    }
  } else if (jobStash) {
    if (isMonday(jobStash.start!)) {
      setMonday(jobStash.start)
      setFriday(addDays(jobStash.start!, 4))
    } else {
      const m = previousMonday(jobStash.start!)
      setMonday(m)
      setFriday(addDays(m, 4))
    }
  }
  const [jobsByWeek] = useQuery(
    findJobsByWeek,
    { range: [monday, friday] },
    { refetchOnWindowFocus: false }
  )

  const handleWeekNumberClick = async (w: number) => {
    const currentWeek = getWeek(new Date())
    const dayDifference = (currentWeek - (w + 1)) * 7
    const monday = startOfWeek(subDays(new Date(), dayDifference), { weekStartsOn: 1 })
    const friday = addDays(monday, 4)

    console.log({ w })
    console.log({ currentWeek })
    console.log(`weeksToDays: ${weeksToDays(w)}`)
    console.table([{ Monday: monday, Friday: friday }])

    setMonday(monday)
    setFriday(friday)
  }

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values))
    const { notes, stashing, range, ...formSubmission } = values
    const [start, end] = [...range.map((t) => new Date(t))]
    console.log({ start })
    formSubmission["start"] = start
    formSubmission["end"] = end

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
          customerId,
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
        jobRet = createJobMutation({
          customerId,
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
  const start = jobStash?.start || job?.start || addBusinessDays(new Date(), 1).setHours(9, 0, 0, 0)
  const end = jobStash?.end || job?.end || addBusinessDays(new Date(), 1).setHours(17, 0, 0, 0)

  const initialValues = {
    title: jobStash?.title || job?.title || undefined,
    range: start && end ? [start, end] : undefined,
    notes: jobStash ? JSON.parse(jobStash.notes) : job?.notes ? JSON.parse(job.notes) : null,
  }

  return (
    <ModalForm
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
      disableStash={disableStash}
      schema={JobFormSchema}
      title={job ? "Edit job" : "New job"}
      submitText={job ? "Update" : "Create"}
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values).then(onSuccess).catch(handleError)
      }}
      render={() => (
        <HStack>
          <Grid
            templateAreas={`
                'title title title s s s'
                'c c c s s s'
                'n n n s s s'
              `}
            templateColumns="repeat(6, 1fr)"
            w="full"
            gap={4}
          >
            <GridItem area="title">
              <LabeledTextField name="title" label="Title" />
            </GridItem>
            <GridItem area="c">
              <LabeledDateField
                name="range"
                label="Date range"
                start={start}
                end={end}
                onClickDay={console.log}
                onClickWeekNumber={(w) => {
                  // console.log({ w })
                  handleWeekNumberClick(w).catch((e) => console.error(e))
                }}
              />
            </GridItem>
            <GridItem area="n">
              <TextAreaField name="notes" label="Notes" placeholder="Add notes about this job..." />
            </GridItem>
            {/* <GridItem area="s">
              <DayView date={new Date()} />
            </GridItem> */}
          </Grid>
          {/* <LabeledTextField name="start" label="Start date/time" /> */}
          {/* <LabeledTextField name="end" label="End date/time" /> */}
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
          {jobStash && (
            <Text fontSize="xs" color={stashFootnoteColor}>
              Stashed by {user?.username}
            </Text>
          )}
        </HStack>
      )}
      {...props}
    />
  )
}

export default JobModalForm
