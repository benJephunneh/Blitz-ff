import { useQuery } from "@blitzjs/rpc"
import getCustomer from "../queries/getCustomer"

type UseCustomerOptions = {
  id?: number
  suspense?: boolean
  enabled?: boolean
}

const useCustomer = ({ id, suspense, enabled }: UseCustomerOptions) => {
  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    { where: { id } },
    { suspense, enabled }
  )

  return {
    customer,
    refetchCustomer,
  }
}

export default useCustomer
