import { useQuery } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import { useEffect } from "react"
import getCustomer from "../queries/getCustomer"

interface UseCustomerProps
  extends Pick<Prisma.CustomerFindFirstArgs, "where" | "include" | "orderBy"> {
  customerId?: number
}

const useCustomer = ({ customerId, where, include, orderBy }: UseCustomerProps) => {
  const [customer, { refetch }] = useQuery(
    getCustomer,
    {
      where,
      include,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: !!customerId,
    }
  )

  return {
    customer,
    refetch,
  }
}

export default useCustomer
