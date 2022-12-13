import { useQuery } from "@blitzjs/rpc"
import { Job, LineItem } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import getJobs from "../queries/getJobs"

type UseJobsProps = {
  customerId?: number
  locationId?: number
}

export const useJobs = ({ customerId, locationId }: UseJobsProps) => {
  const [jobs, { refetch }] = useQuery(
    getJobs,
    {
      customerId,
      locationId,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: !!customerId,
    }
  )

  return {
    jobs,
    refetch,
  }
}
