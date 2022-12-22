import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"

type UseCurrentUserProps = {
  suspense?: boolean
}

export const useCurrentUser = ({ suspense = true }: UseCurrentUserProps = {}) => {
  // const { suspense = true } = props
  const [user] = useQuery(getCurrentUser, null, { suspense })

  const session = useSession()
  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return {
    user,
    isLoggedIn,
    isLoggedOut,
  }
}
