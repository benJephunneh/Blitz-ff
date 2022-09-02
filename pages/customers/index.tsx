import { createRef, useState } from "react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Box, Button, ButtonGroup, Container, Heading, HStack, Icon } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { MutationType } from "app/core/components/types/MutationType"
import CustomerList from "app/customers/components/CustomerList"
import Link from "next/link"
import { TiArrowBack } from "react-icons/ti"
import { GiDiamonds } from "react-icons/gi"
import TitleDivider from "app/core/components/TitleDivider"

const CustomersPage = () => {
  const router = useRouter()
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [mutationState, setMutationState] = useState("edit" as MutationType)
  const ref = createRef()

  return (
    <SidebarLayout title="Customers">
      <CustomerModalForm
        mutationType={mutationState}
        isOpen={creatingCustomer}
        onClose={() => {
          setCreatingCustomer(false)
        }}
        onSuccess={async (_customer) => {
          setCreatingCustomer(false)
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          await router.push(Routes.ShowCustomerPage({ customerId: _customer.id }))
        }}
      />

      {/*
      <ButtonGroup spacing={0} flexDirection="column">
 */}
      <Box shadow="md" bg="white">
        <HStack spacing={10}>
          <Heading ml={4}>Customers</Heading>
          <ButtonGroup isAttached alignSelf="start">
            <Link href={Routes.Dashboard()} passHref>
              <Button
                as="a"
                size="sm"
                variant="outline"
                bg="gray.50"
                borderTopRadius={0}
                borderBottomRightRadius={0}
                borderTopWidth={0}
                leftIcon={<TiArrowBack size={15} />}
                _hover={{ textColor: "cyan.500" }}
              >
                Back to dashboard
              </Button>
            </Link>
            <Button
              mb={4}
              size="sm"
              color="#009a4c"
              bg="gray.100"
              variant="outline"
              leftIcon={<FaPlus />}
              borderStyle="dashed"
              borderColor="blackAlpha.400"
              borderRadius={0}
              borderTopWidth={0}
              onClick={() => {
                setCreatingCustomer(true)
                setMutationState("New")
              }}
            >
              Create customer
            </Button>
          </ButtonGroup>
        </HStack>

        <TitleDivider>
          <Icon as={GiDiamonds} color="#009a4c" />
        </TitleDivider>

        <Container borderRadius={8} mx={0} px={0}>
          <CustomerList />
        </Container>
        {/*
      </ButtonGroup>
 */}
      </Box>
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
