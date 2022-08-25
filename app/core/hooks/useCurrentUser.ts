import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"

type UseCurrentUserProps = {
  suspense?: boolean
}

export const useCurrentUser = (props: UseCurrentUserProps = {}) => {
  const { suspense = true } = props
  const [user] = useQuery(getCurrentUser, null, { suspense })

  return user
}
