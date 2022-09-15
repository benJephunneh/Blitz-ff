import { Job } from "@prisma/client"
import { createContext } from "react"

export type JobContext = {
  createJob: () => void
  editJob: () => void
  refetchJob: () => void
  showDetails: () => void

  job: Job

  // amountPaid: number
  // amountOwed: number
  // balance: number
}

const jobContext = createContext<JobContext>({} as JobContext)

export default jobContext
