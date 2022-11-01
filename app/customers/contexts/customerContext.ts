import { Customer, Location } from "@prisma/client"
import { createContext } from "react"

export type CustomerContext = {
  // pickCustomer: (id: number) => void
  // editCustomer: () => void
  // deleteCustomer: () => void
  showDetails: () => void
  // createLocation: () => void
  // pickLocation: (id: number) => void
  gotoLocation: (id: number) => void

  // customer: Customer
  // displayname: string
  // locations?: Location[]
  // location?: Location
  // locationId?: number

  search: (p: string) => void
  searchParams: string

  // amountPaid: number
  // amountOwed: number
  // balance: number

  // refetchCustomer: () => void
  // refetchLocations: () => void
}

const customerContext = createContext<CustomerContext>({} as CustomerContext)

export default customerContext
