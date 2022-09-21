import { useQuery } from "@blitzjs/rpc"
import getLocation from "../queries/getLocation"

type UseLocationOptions = {
  id: number
  suspense?: boolean
  enabled?: boolean
}

const useLocation = ({ id, suspense, enabled }: UseLocationOptions) => {
  const location = useQuery(
    getLocation,
    {
      where: {
        id,
      },
    },
    {
      suspense,
      enabled,
    }
  )

  return location
}

export default useLocation
