import { useQuery } from "@blitzjs/rpc"
import { Job, LineItem } from "@prisma/client"
import getJobs from "../queries/getJobs"

export const useJobs = (customerId: number | undefined) => {
  const [jobs, { refetch }] = useQuery(
    getJobs,
    {
      customerId,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: !!customerId,
    }
  )

  // if (!customerId) return {} as (Job & { lineitems: LineItem[] })[]
  return {
    jobs,
    refetch,
  }
}
