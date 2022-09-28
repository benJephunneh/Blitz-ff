import { CustomerStash, StashType } from "@prisma/client"
import { createContext } from "react"

export type HeaderContext = {
  logIn: () => void
  signUp: () => void
  logOut: () => void
  createCustomer: () => void
  editStash: (id: number) => void

  customerStashes: CustomerStash[]
  numStashes: number
  // locationStashes: LocationStash[]
  // jobStashes: JobStash[]
  // invoiceStashes: InvoiceStash[]
  // estimateStashes: EstimateStash[]

  refetchStashes: () => void
}

const headerContext = createContext<HeaderContext>({} as HeaderContext)
export default headerContext
