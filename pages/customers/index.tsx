import { createRef, useState } from "react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Button, Container } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { MutationType } from "app/core/components/types/MutationType"
import CustomerList from "app/customers/components/CustomerList"

const CustomersPage = () => {
  const router = useRouter()
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [mutationState, setMutationState] = useState("new")
  const ref = createRef()

  return (
    <SidebarLayout title="Customers">
      <CustomerModalForm
        mutationType={mutationState as MutationType}
        isOpen={creatingCustomer}
        onClose={() => {
          setCreatingCustomer(false)
        }}
        onSuccess={async (_customer) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          await router.push(Routes.ShowCustomerPage({ customerId: _customer.id }))
        }}
      />

      {/*
      <ButtonGroup spacing={0} flexDirection="column">
 */}
      <Button
        onClick={() => {
          setCreatingCustomer(true)
          setMutationState("new")
        }}
        variant="outline"
        leftIcon={<FaPlus />}
        borderStyle="dashed"
        borderColor="blackAlpha.400"
        color="#009a4c"
        mb={4}
      >
        Create customer
      </Button>

      <Container borderRadius={8} mx={0} px={0}>
        <CustomerList />
      </Container>
      {/*
      </ButtonGroup>
 */}
    </SidebarLayout>
  )
}

CustomersPage.authenticate = { redirectTo: Routes.Home() }
// CustomersPage.getLayout = (page) => {
//   <SidebarLayout title="Customers" description="Customer list">
//     {page}
//   </SidebarLayout>
// }

export default CustomersPage
