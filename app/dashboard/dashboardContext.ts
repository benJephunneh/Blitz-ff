import { createContext } from "react"

export type DashboardContext = {
  addCustomer: () => void
  pickCustomer: (id: number | undefined) => void
  deleteCustomer: () => void
  addJob: () => void

  customerId?: number
}

const dashboardContext = createContext<DashboardContext>({} as DashboardContext)

export default dashboardContext
