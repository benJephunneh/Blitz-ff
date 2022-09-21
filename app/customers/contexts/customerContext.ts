import { Customer, Location } from "@prisma/client"
import { createContext } from "react"

export type CustomerContext = {
  pickCustomer: (id: number) => void
  editCustomer: () => void
  deleteCustomer: () => void
  showDetails: () => void
  createLocation: () => void

  customer: Customer
  displayName: string
  locations?: Location[]

  // amountPaid: number
  // amountOwed: number
  // balance: number

  refetchCustomer: () => void
  // refetchLocations: () => void
}

const customerContext = createContext<CustomerContext>({} as CustomerContext)

export default customerContext
