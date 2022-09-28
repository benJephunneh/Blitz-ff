import { BlitzCtx } from "@blitzjs/auth"
import { Ctx, Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import login from "app/auth/mutations/login"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import LocationModalForm from "app/locations/components/LocationModalForm"
import deleteStash from "app/stashes/mutations/deleteStash"
import getStash from "app/stashes/queries/getStash"
import getStashes from "app/stashes/queries/getStashes"
import db, { StashType } from "db"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import ConfirmDeleteModal from "../ConfirmDeleteModal"
import headerContext from "./headerContext"

const { Provider } = headerContext

type HeaderProviderProps = {
  children?: ReactNode
}

type StashProps = {
  customerId?: number
  locationId?: number
  jobId?: number
  invoiceId?: number
  estimateId?: number
}

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const router = useRouter()

  const [loggingIn, setLoggingIn] = useState(false)
  const [signingUp, setSigningUp] = useState(false)

  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(false)

  const [editingLocation, setEditingLocation] = useState(false)
  const [editingJob, setEditingJob] = useState(false)
  const [editingEstimate, setEditingEstimate] = useState(false)

  const [{ customerStashes, count: numStashes }, { refetch: refetchStashes }] = useQuery(
    getStashes,
    {},
    {
      suspense: true,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  )
  const [stashId, setStashId] = useState<number>()
  const [editingStash, setEditingStash] = useState(false)
  const [deletingStash, setDeletingStash] = useState(false)
  const [deleteStashMutation] = useMutation(deleteStash)

  const [loginMutation] = useMutation(login)
  const [logoutMutation] = useMutation(logout)

  useEffect(() => {
    // stashId got set
    // editingStash is true
    // load stash:
    async function gs(id: number, stashType: StashType) {
      switch (stashType) {
        case "Customer":
          // return await db.customerStash.findFirst({
          //   where: { id }
          // })
          setStashId(id)
          setEditingCustomer(true)
          setEditingStash(false)
          break
        // case 'Location':
        //   return await db.locationStash.findFirst({
        //     where: { id }
        //   })
        //   break;
        // case 'Job':
        //   return await db.jobStash.findFirst({
        //     where: { id }
        //   })
        //   break;
        // case 'Invoice':
        //   return await db.invoiceStash.findFirst({
        //     where: { id }
        //   })
        //   break;
        // case 'Estimate':
        //   return await db.estimateStash.findFirst({
        //     where: { id }
        //   })
        //   break;
        default:
          break
      }
    }
    // open appropriate modal
  }, [editingStash])

  return (
    <Provider
      value={{
        logIn: () => setLoggingIn(true),
        signUp: () => setSigningUp(true),
        logOut: () => logoutMutation(),
        createCustomer: () => setCreatingCustomer(true),
        editStash: (id) => {
          setStashId(id)
          setEditingStash(true)
        },

        customerStashes,
        numStashes,

        refetchStashes,
      }}
    >
      <NewUserModalForm
        isOpen={signingUp}
        onClose={() => setSigningUp(false)}
        onSuccess={async () => {
          await router.push(Routes.Dashboard())
        }}
      />

      <LoginUserModalForm
        isOpen={loggingIn}
        onClose={() => setLoggingIn(false)}
        onSuccess={async () => {
          await router.push(Routes.Dashboard())
        }}
      />

      {children}
    </Provider>
  )
}

export default HeaderProvider
