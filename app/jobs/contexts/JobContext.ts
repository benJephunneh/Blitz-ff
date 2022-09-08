import { createContext } from "react"

export type JobContext = {
  createJob: () => void
  editJob: () => void
  refetchJob: () => void
  showDetails: () => void

  job: {
    id: number
    title: string
    start: Date
    end: Date
    locationId: number
  }

  // amountPaid: number
  // amountOwed: number
  // balance: number
}

const jobContext = createContext<JobContext>({} as JobContext)

export default jobContext
