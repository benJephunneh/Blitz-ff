import { useQuery } from "@blitzjs/rpc"
import { Prisma } from "@prisma/client"
import { useEffect } from "react"
import getCustomer from "../queries/getCustomer"

interface UseCustomerOptions extends Pick<Prisma.CustomerFindFirstArgs, "where" | "include"> {
  id?: number
  suspense?: boolean
  // enabled?: boolean
  refetchOnWindowFocus?: boolean
  staleTime?: number
}

const useCustomer = ({
  id,
  suspense = true,
  // enabled,
  refetchOnWindowFocus = false,
  staleTime = Infinity,
  where,
  include,
}: UseCustomerOptions) => {
  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    {
      where,
      include,
    },
    {
      suspense,
      enabled: !!id,
      refetchOnWindowFocus,
      staleTime,
    }
  )

  return {
    customer,
    refetchCustomer,
  }
}

export default useCustomer
