import {
  Customer,
  CustomerStash,
  JobStash,
  Location,
  LocationStash,
  StashType,
} from "@prisma/client"
import { createContext } from "react"

export type HeaderContext = {
  // User
  // signUp: () => void
  // logIn: () => void
  // logOut: () => void
  // isLoggedIn: boolean
  // isLoggedOut: boolean

  // Customer
  customer?: Customer
  createCustomer: () => void
  editCustomer: () => void
  deleteCustomer: () => void
  // gotoCustomer: (id: number) => void

  // Location
  locationId?: number
  locationIds?: Array<{ id: number }>
  location?: Location
  createLocation: () => void
  editLocation: () => void
  deleteLocation: () => void
  // pickLocation: (l: Location) => void
  pickLocation: (id: number | undefined) => void

  // Stash
  customerStashes: CustomerStash[]
  locationStashes: LocationStash[]
  jobStash?: JobStash
  numStashes: number
  editStash: (id: number | undefined, type: StashType | undefined) => void

  // locationStashes: LocationStash[]
  // jobStashes: JobStash[]
  // invoiceStashes: InvoiceStash[]
  // estimateStashes: EstimateStash[]

  refetchCustomer: () => void
  refetchStashes: () => void
}

const headerContext = createContext<HeaderContext>({} as HeaderContext)
export default headerContext
