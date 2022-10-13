import { Prisma, User } from "@prisma/client"
import { createContext } from "react"

export type UserContext = {
  signUp: () => void
  logIn: () => void
  logOut: () => void

  isLoggedIn: boolean
  isLoggedOut: boolean

  // currentUser?: Pick<User, "id" | "username" | "email" | "role"> | null
}

const userContext = createContext<UserContext>({} as UserContext)
export default userContext
