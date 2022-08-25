import { Suspense, useState } from "react";
import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import getCustomers from "app/customers/queries/getCustomers";
import SidebarLayout from "app/core/layouts/SidebarLayout";
import { Button, ButtonGroup, UnorderedList } from "@chakra-ui/react";
import Layout from "app/core/layouts/Layout";
import { FaPlus } from "react-icons/fa";

const ITEMS_PER_PAGE = 100;

export const CustomersList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <UnorderedList>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link href={Routes.ShowCustomerPage({ customerId: customer.id })}>
              <a>{customer.firstname} {customer.lastname}</a>
            </Link>
          </li>
        ))}
      </UnorderedList>

      <ButtonGroup isAttached>
        <Button variant='outline' disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button variant='outline' disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

const CustomersPage = () => {
  const [creatingCustomer, setCreatingCustomer] = useState(false)

  return (
    <SidebarLayout title="Customers">
      <div>
        <Button
          onClick={() => { setCreatingCustomer(true) }}
          variant='outline'
          leftIcon={<FaPlus />}
          borderStyle='dashed'
          borderColor='blackAlpha.400'
          color='#009a4c'>
          Create customer
        </Button>

        <Suspense>
          <CustomersList />
        </Suspense>
      </div>
    </SidebarLayout>
  )
}

CustomersPage.authenticate = { redirectTo: Routes.Home() }
// CustomersPage.getLayout = (page) => {
//   <SidebarLayout title="Customers" description="Customer list">
//     {page}
//   </SidebarLayout>
// }

export default CustomersPage;
