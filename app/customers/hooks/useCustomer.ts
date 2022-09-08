import { useQuery } from "@blitzjs/rpc"
import { useState } from "react"
import getCustomer from "../queries/getCustomer"

type UseCustomerOptions = {
  suspense?: boolean
  enabled?: boolean
}

const useCustomer = (id: number, { suspense, enabled }: UseCustomerOptions) => {
  const customer = useQuery(getCustomer, { where: { id } }, { suspense, enabled })

  return customer
}

export default useCustomer
