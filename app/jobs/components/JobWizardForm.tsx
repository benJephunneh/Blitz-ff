import { useMutation } from "@blitzjs/rpc"
import { Job, LineItem } from "@prisma/client"
import WeekView from "app/calendar/components/WeekView"
import headerContext from "app/core/components/header/headerContext"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import createStash from "app/stashes/mutations/createStash"
import deleteStash from "app/stashes/mutations/deleteStash"
import updateStash from "app/stashes/mutations/updateStash"
import { useContext, useState } from "react"
import createJob from "../mutations/createJob"
import updateJob from "../mutations/updateJob"

type JobWizardFormProps = {
  customerId?: number
  locationId?: number
  jobId?: number
  stashId?: number
  disableStash?: boolean
  isOpen: boolean
  onClose: () => void
  onSuccess?: (job: Job) => void
  onSubmit: () => void
}

type Values = {
  jobId: number
  title: string
  start?: Date
  end?: Date
  notes?: string
  lineitems?: LineItem[]
}

const JobWizardForm = ({
  customerId,
  locationId,
  jobId,
  stashId,
  disableStash,
  isOpen,
  onClose,
  onSuccess,
  onSubmit,
}: JobWizardFormProps) => {
  const { jobs } = useContext(headerContext)
  const [page, setPage] = useState(0)
  const [job, setJob] = useState<Job>()
  const user = useCurrentUser()

  const [createJobMutation] = useMutation(createJob)
  const [updateJobMutation] = useMutation(updateJob)
  const [createStashMutation] = useMutation(createStash)
  const [updateStashMutation] = useMutation(updateStash)
  const [deleteStashMutation] = useMutation(deleteStash)

  const [calendarValue, onCalendarChange] = useState(new Date())
  const [calendarView, setCalendarView] = useState(<WeekView />)

  const stashType = "Job"
  const next = (values: Values) => {
    // setPage()
  }

  // const { lineitems, ...j } = jobs?.find(({ id }) => id === jobId)
  // const lineitems = job?.lineitems
  // let title = ''
  // let start: Date | null
  // let end: Date | null
  // let notes: string
  // let lineitems: LineItem[]
  const { title, start, end, notes } = job
    ? job
    : { title: "", start: null, end: null, notes: null }
  // console.log(title, start, end, notes, lineitems)

  // return (

  // )
}

export default JobWizardForm
