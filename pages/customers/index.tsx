import { useState } from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import CustomerList from "app/customers/components/CustomerList"
import HeaderLayout from "app/core/layouts/HeaderLayout"

const CustomersPage: BlitzPage = () => {
  const router = useRouter()
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  // const [mutationState, setMutationState] = useState<MutationType>("edit")
  // const ref = createRef()

  const buttonBorder = useColorModeValue('gray.300', 'gray.600')
  const emptyBg = useColorModeValue('gray.200', 'gray.700')

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
      <Flex h='full' bg={useColorModeValue("white", "gray.800")}>
        <VStack>
          <HStack w="100vw" justifyContent='space-between'>
            <Heading size='md' ml={4} textColor={useColorModeValue('gray.600', 'gray.300')}>
              Customers
            </Heading>
            <Spacer />
            <Box>
              <Button
                mb={4}
                mr={4}
                mt={4}
                size="sm"
                variant="outline"
                leftIcon={<FaPlus size={10} />}
                borderStyle="dashed"
                bg={useColorModeValue('transparent', 'blue.200')}
                borderColor={useColorModeValue("blue.300", "blue.800")}
                textColor={useColorModeValue('gray.600', 'gray.800')}
                _hover={{ bg: useColorModeValue('blue.200', 'blue.300') }}
                onClick={() => {
                  setCreatingCustomer(true)
                }}
              >
                Create customer
              </Button>
            </Box>
          </HStack>

          <Container w="90vw" justifyContent="space-around">
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
