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

// type JobWizardFormProps = {
//   customerId?: number
//   locationId?: number
//   jobId?: number
//   stashId?: number
//   disableStash?: boolean
//   isOpen: boolean
//   onClose: () => void
//   onSuccess?: (job: Job) => void
//   onSubmit: () => void
// }

type Values = {
  jobId: number
  title: string
  start?: Date
  end?: Date
  notes?: string
  lineitems?: LineItem[]
}

import React from "react"
import PropTypes from "prop-types"
import { Form } from "react-final-form"

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {},
    }
  }
  next = (values) =>
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }))

  previous = () =>
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
    }))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {
    const activePage = React.Children.toArray(this.props.children)[this.state.page]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = (values) => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <Form initialValues={values} validate={this.validate} onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}
              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
              )}
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Form>
    )
  }
}

// const JobWizardForm = ({ customerId, locationId, jobId, stashId, disableStash, isOpen, onClose, onSuccess, onSubmit }: JobWizardFormProps) => {
//   const { jobs } = useContext(headerContext)
//   const [page, setPage] = useState(0)
//   const [job, setJob] = useState<Job>()
//   const user = useCurrentUser()

//   const [createJobMutation] = useMutation(createJob)
//   const [updateJobMutation] = useMutation(updateJob)
//   const [createStashMutation] = useMutation(createStash)
//   const [updateStashMutation] = useMutation(updateStash)
//   const [deleteStashMutation] = useMutation(deleteStash)

//   const [calendarValue, onCalendarChange] = useState(new Date())
//   const [calendarView, setCalendarView] = useState(<WeekView />)

//   const stashType = "Job"
//   const next = (values: Values) => {
//     // setPage()
//   }

//   // const { lineitems, ...j } = jobs?.find(({ id }) => id === jobId)
//   // const lineitems = job?.lineitems
//   // let title = ''
//   // let start: Date | null
//   // let end: Date | null
//   // let notes: string
//   // let lineitems: LineItem[]
//   const { title, start, end, notes } = job
//     ? job
//     : { title: '', start: null, end: null, notes: null }
//   // console.log(title, start, end, notes, lineitems)

//   // return (

//   // )
// }

// export default JobWizardForm
