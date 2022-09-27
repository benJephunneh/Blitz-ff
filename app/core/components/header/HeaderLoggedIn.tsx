import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { useRouter } from "next/router"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { Customer, CustomerStash } from "db"
import createCustomer from "app/customers/mutations/createCustomer"
import { TypeOf, z } from "zod"
import { CreateCustomer, CreateCustomerStash } from "app/customers/validations"

const HeaderLoggedIn = () => {
  const router = useRouter()
  const [creatingCustomer, setCreatingCustomer] = useState(false)
  const [stashingCustomer, setStashingCustomer] = useState(false)
  const [logoutMutation] = useMutation(logout)

  return (
    <Box justifyContent="flex-end">
      <CustomerModalForm
        isOpen={creatingCustomer}
        onClose={() => setCreatingCustomer(false)}
        onSuccess={(customer) => {
          setCreatingCustomer(false)
          if (customer as Customer) {
            router
              .push(Routes.CustomersPage())
              // .push(Routes.ShowCustomerPage({ customerId: customer.id }))
              .catch((e) => console.log(`HeaderLoggedIn createCustomer error: ${e}`))
          } else if (customer as CustomerStash) {
            router
              .push(Routes.CustomersPage())
              .catch((e) => console.log(`HeaderLoggedIn stashCustomer error: ${e}`))
          }
        }}
      />

      <Button
        mr={2}
        size="sm"
        variant="outline"
        textColor={useColorModeValue("cyan.600", "cyan.600")}
        borderColor={useColorModeValue("cyan.600", "cyan.600")}
        borderWidth={1}
        borderStyle="dashed"
        onClick={async () => {
          setCreatingCustomer(true)
        }}
        _hover={{ bg: useColorModeValue("blackAlpha.100", "gray.900") }}
        leftIcon={<FaPlus size={10} />}
      >
        New customer
      </Button>
      <Button
        size="sm"
        variant="outline"
        color={useColorModeValue("blackAlpha.600", "gray.300")}
        bg={useColorModeValue("blackAlpha.100", "gray.700")}
        borderColor={useColorModeValue("gray.50", "blackAlpha.100")}
        borderWidth={1}
        textColor="current"
        onClick={async () => {
          await logoutMutation()
        }}
        _hover={{ bg: useColorModeValue("blackAlpha.300", "gray.900") }}
      >
        Log out
      </Button>
    </Box>
  )
}

export default HeaderLoggedIn
