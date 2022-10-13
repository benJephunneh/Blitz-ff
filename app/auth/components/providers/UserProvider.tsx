import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import userContext from "../contexts/userContext"
import LoginUserModalForm from "../LoginUserModalForm"
import NewUserModalForm from "../NewUserModalForm"

const { Provider } = userContext
type UserProviderProps = {
  children?: ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter()
  const [loggingIn, setLoggingIn] = useState(false)
  const [signingUp, setSigningUp] = useState(false)
  const [logOutMutation] = useMutation(logout)

  const session = useSession()
  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <Provider
      value={{
        signUp: () => setSigningUp(true),
        logIn: () => setLoggingIn(true),
        logOut: () => logOutMutation(),

        isLoggedIn,
        isLoggedOut,
      }}
    >
      <NewUserModalForm
        isOpen={signingUp}
        onClose={() => setSigningUp(false)}
        onSuccess={async () => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          await router.push(next)
          // await router.push(Routes.Dashboard())
        }}
      />

      <LoginUserModalForm
        isOpen={loggingIn}
        onClose={() => setLoggingIn(false)}
        onSuccess={async () => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          await router.push(next)
          // await router.push(Routes.Dashboard())
        }}
      />

      {children}
    </Provider>
  )
}

export default UserProvider
