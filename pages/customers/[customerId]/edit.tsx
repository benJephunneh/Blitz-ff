import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getCustomer from "app/customers/queries/getCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import { UpdateCustomer } from "app/customers/validations"

export const EditCustomer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer, { setQueryData }] = useQuery(
    getCustomer,
    { id: customerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const onSubmit = async (values) => {
    await new Promise((resolve) => {
      resolve(updateCustomerMutation({ id: customer.id, ...values }))
    })
  }
  const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"

  return (
    <>
      <Head>
        <title>Edit Customer {customer.id}</title>
      </Head>

      <div>
        <h1>Edit Customer {customer.id}</h1>
        <pre>{JSON.stringify(customer, null, 2)}</pre>

        <CustomerForm
          submitText="Update Customer"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateCustomer}
          initialValues={customer}
          onSubmit={(values) => {
            onSubmit(values)
              .then((updated) => setQueryData(updated!))
              .then(() => router.push(next))
              .catch((error) => {
                console.error(error)
                return { [FORM_ERROR]: error.toString() }
              })
          }}
        />
      </div>
    </>
  )
}

const EditCustomerPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCustomer />
      </Suspense>

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </div>
  )
}

EditCustomerPage.authenticate = true
EditCustomerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCustomerPage
