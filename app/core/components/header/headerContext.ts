import { Customer, CustomerStash, StashType } from "@prisma/client"
import { createContext } from "react"

export type HeaderContext = {
  signUp: () => void
  logIn: () => void
  logOut: () => void
  createCustomer: () => void
  editCustomer: () => void
  deleteCustomer: () => void
  editStash: (id: number) => void

  customer?: Customer
  customerStashes: CustomerStash[]
  numStashes: number
  // locationStashes: LocationStash[]
  // jobStashes: JobStash[]
  // invoiceStashes: InvoiceStash[]
  // estimateStashes: EstimateStash[]

  refetchCustomer: () => void
  refetchStashes: () => void
}

const headerContext = createContext<HeaderContext>({} as HeaderContext)
export default headerContext
