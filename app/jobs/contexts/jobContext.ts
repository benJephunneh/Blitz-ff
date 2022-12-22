import { createContext } from "react"

export type JobContext = {
  jobId?: number

  createJob: () => void
  editJob: () => void
  refetchJob: () => void
  showDetails: () => void
  deleteJob: () => void

  // amountPaid: number
  // amountOwed: number
  // balance: number
}

const jobContext = createContext<JobContext>({} as JobContext)

export default jobContext
