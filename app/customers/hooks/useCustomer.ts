import { useQuery } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import { useEffect } from "react"
import getCustomer from "../queries/getCustomer"

interface UseCustomerProps
  extends Pick<Prisma.CustomerFindFirstArgs, "where" | "select" | "orderBy"> {
  // customerId?: number
}

const useCustomer = ({ where, select, orderBy }: UseCustomerProps) => {
  const [customer, { refetch }] = useQuery(
    getCustomer,
    {
      where,
      select,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      suspense: true,
      // enabled: !!customerId,
    }
  )

  return {
    customer,
    refetch,
  }
}

export default useCustomer
