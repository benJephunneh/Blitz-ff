import { createContext } from "react"

export type DashboardContext = {
  nothing: number
}

const dashboardContext = createContext<DashboardContext>({} as DashboardContext)

export default dashboardContext
