import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createCustomer from "app/customers/mutations/createCustomer";
import {
  CustomerForm,
  FORM_ERROR,
} from "app/customers/components/CustomerForm";

const NewCustomerPage = () => {
  const router = useRouter();
  const [createCustomerMutation] = useMutation(createCustomer);
  const onSubmit = async values => {
    await new Promise((resolve) => {
      resolve(createCustomerMutation(values))
    })
  }

  return (
    <Layout title={"Create New Customer"}>
      <h1>Create New Customer</h1>

      <CustomerForm
        submitText="Create Customer"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCustomer}
        // initialValues={{}}
        onSubmit={(values) => {
          onSubmit(values)
            .then((customer) => router.push(Routes.ShowCustomerPage({ customerId: customer.id })))
            .catch((error) => {
              console.error(error)
              return { [FORM_ERROR]: error.toString() }
            })
        }}
        onSuccess={(customer) => {
          router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
        }}
      />

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </Layout>
  );
};

NewCustomerPage.authenticate = true;

export default NewCustomerPage;
