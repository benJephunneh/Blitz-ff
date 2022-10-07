import { useSession } from "@blitzjs/auth"
import { Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import login from "app/auth/mutations/login"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import deleteStash from "app/stashes/mutations/deleteStash"
import getStashes from "app/stashes/queries/getStashes"
import { StashType } from "db"
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

  // User
  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId
  const [loggingIn, setLoggingIn] = useState(false)
  const [signingUp, setSigningUp] = useState(false)

  // Customer
  const { customerId, locationId } = useParams("number")
  const [customer, { refetch: refetchCustomer }] = useQuery(
    getCustomer,
    {
      where: { id: customerId },
    },
    {
      enabled: !!customerId,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )

  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [deletingCustomer, setDeletingCustomer] = useState(false)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  // Stash
  const [{ customerStashes, count: numStashes }, { refetch: refetchStashes }] = useQuery(
    getStashes,
    {},
    {
      // suspense: true,
      // enabled: true,
      refetchOnWindowFocus: false,
      // refetchInterval: 2000,
      // refetchIntervalInBackground: true,
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
        editCustomer: () => setEditingCustomer(true),
        deleteCustomer: () => setDeletingCustomer(true),
        refetchCustomer,
        editStash: (id) => {
          setStashId(id)
          setEditingStash(true)
        },

        customer,
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

      {isLoggedIn && (
        <>
          <CustomerModalForm
            // customer={customer}
            customerId={customerId}
            isOpen={editingCustomer}
            onClose={() => setEditingCustomer(false)}
            disableStash={true}
            onSuccess={() => {
              setEditingCustomer(false)
              refetchCustomer().catch((e) => console.log(`Header CustomerModalForm error: ${e}`))
            }}
          />

          <ConfirmDeleteModal
            title={`Delete ${customer?.firstname} ${customer?.lastname}?`}
            description="Are you sure you want to delete this customer and related history?  All associated locations, jobs, invoices, and estimates will also be deleted."
            isOpen={deletingCustomer}
            onClose={() => setDeletingCustomer(false)}
            onConfirm={async () => {
              await deleteCustomerMutation({ id: customer!.id })
                .then(() => router.push(Routes.CustomersPage()))
                .catch((e) => console.log(`customerProvider DeleteModal error: ${e}`))
            }}
          />
        </>
      )}

      {children}
    </Provider>
  )
}

export default HeaderProvider
