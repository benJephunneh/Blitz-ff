import { Customer, CustomerStash, StashType } from "@prisma/client"
import { createContext } from "react"

export type HeaderContext = {
  // User
  signUp: () => void
  logIn: () => void
  logOut: () => void

  // Customer
  customer?: Customer
  createCustomer: () => void
  editCustomer: () => void
  deleteCustomer: () => void
  // gotoCustomer: (id: number) => void

  // Location
  locationId?: number
  locationIds?: Array<{ id: number }>
  pickLocation: (id: number | undefined) => void

  // Stash
  customerStashes: CustomerStash[]
  numStashes: number
  editStash: (id: number) => void

  // locationStashes: LocationStash[]
  // jobStashes: JobStash[]
  // invoiceStashes: InvoiceStash[]
  // estimateStashes: EstimateStash[]

  refetchCustomer: () => void
  refetchStashes: () => void
}

const headerContext = createContext<HeaderContext>({} as HeaderContext)
export default headerContext
