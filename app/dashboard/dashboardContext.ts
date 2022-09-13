import { createContext } from "react"

export type DashboardContext = {
  addCustomer: () => void
  addJob: () => void
}

const dashboardContext = createContext<DashboardContext>({} as DashboardContext)

export default dashboardContext
