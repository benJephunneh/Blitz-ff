import useCustomer from "app/customers/hooks/useCustomer"
import { ReactNode } from "react"
import dashboardContext from "./dashboardContext"

const { Provider } = dashboardContext

type DashboardProviderProps = {
  children?: ReactNode
}

const DashboardProvider = ({ children }: DashboardProviderProps) => {
  return <Provider value={{ nothing: 42 }}>{children}</Provider>
}

export default DashboardProvider
