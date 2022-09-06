import { createContext } from "react"
import useCalculateBalanceSheet from "../hooks/useCalculateBalanceSheet"

export type CustomerContext = {
  editCustomer: () => void
  showDetails: () => void

  customer: {
    firstname: string
    lastname: string

    locations: ReturnType<typeof useCalculateBalanceSheet>["locations"]
    // amountPaid: number
    // amountOwed: number
    // balance: number

    refetchOrganizer: () => void
  }
}

const customerContext = createContext<CustomerContext>({} as CustomerContext)

export default customerContext
