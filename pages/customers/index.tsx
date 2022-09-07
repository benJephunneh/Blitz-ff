import { createRef, useState } from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { MutationType } from "app/core/components/types/MutationType"
import CustomerList from "app/customers/components/CustomerList"
import Link from "next/link"
import { TiArrowBack } from "react-icons/ti"
import { GiDiamonds } from "react-icons/gi"
import TitleDivider from "app/core/components/TitleDivider"
import HeaderLayout from "app/core/layouts/HeaderLayout"

const CustomersPage: BlitzPage = () => {
  const router = useRouter()
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  // const [mutationState, setMutationState] = useState<MutationType>("edit")
  const ref = createRef()

  return (
    <>
      <CustomerModalForm
        isOpen={creatingCustomer}
        onClose={() => setCreatingCustomer(false)}
        onSuccess={(customer) => router.push(Routes.ShowCustomerPage({ customerId: customer.id }))}
      />

      {/*
      <ButtonGroup spacing={0} flexDirection="column">
 */}
      <Flex shadow="md" bg={useColorModeValue("white", "gray.600")}>
        <VStack>
          <HStack w="100vw">
            <Heading ml={4} textColor={useColorModeValue("#009a4c", "yellow.200")}>
              Customers
            </Heading>
            <Spacer />
            <Box>
              <Button
                mb={4}
                size="sm"
                variant="outline"
                leftIcon={<FaPlus size={10} />}
                color={useColorModeValue("#009a4c", "yellow.200")}
                bg={useColorModeValue("cyan.50", "gray.500")}
                borderStyle="dashed"
                borderColor={useColorModeValue("blackAlpha.400", "gray.400")}
                borderRadius={0}
                borderBottomLeftRadius={8}
                borderTopWidth={0}
                borderRightWidth={0}
                alignSelf="start"
                justifySelf="end"
                onClick={() => {
                  setCreatingCustomer(true)
                }}
              >
                Create customer
              </Button>
            </Box>
          </HStack>

          <Container w="90vw" justifyContent="center">
            <CustomerList />
          </Container>
          {/*
      </ButtonGroup>
 */}
        </VStack>
      </Flex>
    </>
  )
}

CustomersPage.authenticate = { redirectTo: Routes.Home() }
CustomersPage.getLayout = (page) => (
  <HeaderLayout title="Customers" description="Customer list">
    {page}
  </HeaderLayout>
)

export default CustomersPage
