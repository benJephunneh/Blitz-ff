import { useQuery } from "@blitzjs/rpc"
import { useState } from "react"
import getCustomer from "../queries/getCustomer"
import getCustomerOrganizer from "../queries/getCustomerOrganizer"

type CustomerProviderProps = {
  id: number
}
const CustomerProvider = ({ id }: CustomerProviderProps) => {
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [showingDetails, setShowingDetails] = useState(false)

  const [customer, { refetch: refetchCustomer }] = useQuery(getCustomer, { id }, { enabled: true })

  const [customerOranizer, { refetch: refetchOrganizer }] = useQuery(getCustomerOrganizer, { id })
  // const { jobs, totalPaid, totalOwed } = useCalculateBalanceSheet(customerOrganizer?.jobs || [])

  // return (
  //   <>
  //   </>
  // )
}

export default CustomerProvider
