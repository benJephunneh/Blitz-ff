import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  keyframes,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { FaPlus } from "react-icons/fa"
import getStashes from "app/stashes/queries/getStashes"
import { FcFullTrash } from "react-icons/fc"
import deleteStash from "app/stashes/mutations/deleteStash"
import LocationModalForm from "app/locations/components/LocationModalForm"
import headerContext from "./headerContext"
import userContext from "app/auth/components/contexts/userContext"
import StashMenu from "app/stashes/components/StashMenu"
import LocateMenu from "app/locates/components/LocateMenu"

const HeaderLoggedIn = () => {
  const router = useRouter()
  const { logOut } = useContext(userContext)
  const {
    createCustomer,
    editStash,
    refetchStashes,
    customerStashes,
    locationStashes,
    jobStashes,
    numStashes,
  } = useContext(headerContext)

  const [deleteStashMutation] = useMutation(deleteStash)

  const stashKeyframes = keyframes`
    from { background-color: ${useColorModeValue("red", "cyan")}; color: ${useColorModeValue(
    "white",
    "black"
  )} }
      to { background-color: ${useColorModeValue("white", "#4a5568")}; color: ${useColorModeValue(
    "red",
    "cyan"
  )} }`
  const stashAnimation = `${stashKeyframes} 1s alternate infinite`

  // const parsed = JSON.parse(customerStashes[0]!.notes)
  // console.log(parsed.content[0].content[0].text)

  return (
    <Box justifyContent="flex-end">
      {/* <CustomerModalForm
        stashId={stashId}
        // customerStash={customerStash}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={async (customer) => {
          setEditingCustomer(false)
          // await refetchStashes()
          if (customer) {
            if ("notes" in customer) {
              refetchStashes().catch((e) =>
                console.log(`HeaderLoggedIn customer stash error: ${e}`)
              )
            } else {
              if (stashId) await refetchStashes()
              router
                .push(Routes.ShowCustomerPage({ customerId: customer.id }))
                .catch((e) => console.log(`HeaderLoggedIn createCustomer error: ${e}`))
            }
          }
        }}
      /> */}

      {/* <LocationModalForm
        stashId={stashId}
        customerId={customerId!}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        onSuccess={async (location) => {
          setEditingLocation(false)
          if (location) {
            if ("notes" in location) {
              refetchStashes().catch((e) =>
                console.log(`HeaderLoggedIn location stash error: ${e}`)
              )
            } else {
              pickLocation(location.id)
              // router
              //   .push(Routes.ShowLocationPage({ customerId: customerId!, locationId: location.id }))
              //   .catch((e) => console.log(`HeaderLogggedIn createLocation error: ${e}`))
            }
          }
        }}
      /> */}

      <HStack spacing={4}>
        <StashMenu />
        <LocateMenu />
        <Button
          size="sm"
          variant="outline"
          textColor={useColorModeValue("cyan.600", "cyan.400")}
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderWidth={1}
          borderStyle="dashed"
          onClick={createCustomer}
          _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
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
          onClick={logOut}
          _hover={{ bg: useColorModeValue("blackAlpha.300", "gray.900") }}
        >
          Log out
        </Button>
      </HStack>
    </Box>
  )
}

export default HeaderLoggedIn
