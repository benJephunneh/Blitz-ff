import { useQuery } from "@blitzjs/rpc"
import getCustomer from "../queries/getCustomer"

type UseCustomerOptions = {
  id?: number
  suspense?: boolean
  enabled?: boolean
}

const useCustomer = ({ id, suspense = true, enabled }: UseCustomerOptions) => {
  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    { id },
    { suspense, enabled }
  )

  return {
    customer,
    refetchCustomer,
  }
}

export default useCustomer
