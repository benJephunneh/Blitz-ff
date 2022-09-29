import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  keyframes,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { Customer, CustomerStash, StashType } from "db"
import createCustomer from "app/customers/mutations/createCustomer"
import { TypeOf, z } from "zod"
import { CreateCustomer, CreateCustomerStash } from "app/customers/validations"
import { motion } from "framer-motion"
import getStashes from "app/stashes/queries/getStashes"
import Link from "next/link"
import LocationModalForm from "app/locations/components/LocationModalForm"
import { FcDeleteRow } from "react-icons/fc"
import deleteStash from "app/stashes/mutations/deleteStash"

const HeaderLoggedIn = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const [editingCustomer, setEditingCustomer] = useState(false)
  const [stashingCustomer, setStashingCustomer] = useState(false)
  const [stashId, setStashId] = useState<number>()
  const [{ customerStashes, count: numStashes }, { refetch: refetchStashes }] = useQuery(
    getStashes,
    {},
    {
      refetchOnWindowFocus: false,
    }
  )

  const [editingLocation, setEditingLocation] = useState(false)
  const [editingJob, setEditingJob] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(false)
  const [editingEstimate, setEditingEstimate] = useState(false)

  const stashKeyframes = keyframes`
    from { background-color: red; color: white }
    to { background-color: white; color: red }
    `
  const stashAnimation = `${stashKeyframes} 1s alternate infinite`

  // const parsed = JSON.parse(customerStashes[0]!.notes)
  // console.log(parsed.content[0].content[0].text)

  return (
    <Box justifyContent="flex-end">
      <CustomerModalForm
        stashId={stashId}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={async (customer) => {
          setEditingCustomer(false)
          if (customer as Customer) {
            await refetchStashes()
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

      {/* <LocationModalForm
				stashId={stashId}
				isOpen={editingLocation}
				onClose={() => setEditingLocation(false)}
				onSuccess={(location) => {
					refetchStashes()
						.then(() => setEditingLocation(false))
						// .then(() =>
						//   router.push(Routes.ShowLocationPage({ customerId: custId!, locationId: location.id }))
						// )
						.catch((e) => console.log(`HeaderLogggedIn LocationModal error: ${e}`))
				}}
			/> */}

      <HStack spacing={4}>
        <Menu isLazy>
          <Button
            as={MenuButton}
            size="sm"
            colorScheme={numStashes ? "red" : "blue"}
            animation={numStashes && stashAnimation}
            variant={numStashes ? "solid" : "ghost"}
          >
            {`${numStashes} stashed`}
          </Button>
          <MenuList>
            {customerStashes.map((cStash, ii) => (
              // <MenuItem key={ii} fontWeight='semibold' onClick={() => editStash(cStash.id, cStash.stashType)}>
              <MenuItem
                key={ii}
                fontWeight="semibold"
                onClick={() => {
                  setStashId(cStash.id)
                  setEditingCustomer(true)
                }}
                textOverflow="ellipsis"
              >
                <Text textOverflow="ellipsis">
                  {cStash.displayname}: {JSON.parse(cStash.notes).content[0].content[0].text}
                </Text>
                <Spacer />
                <Icon
                  as={FcDeleteRow}
                  h={6}
                  w={6}
                  onClick={() => deleteStash({ id: cStash.id, stashType: cStash.stashType })}
                />
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <ButtonGroup spacing={4} alignItems="center">
          <Button
            size="sm"
            variant="outline"
            textColor={useColorModeValue("cyan.600", "cyan.600")}
            borderColor={useColorModeValue("cyan.600", "cyan.600")}
            borderWidth={1}
            borderStyle="dashed"
            onClick={() => {
              setStashId(undefined)
              setEditingCustomer(true)
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
        </ButtonGroup>
      </HStack>
    </Box>
  )
}

export default HeaderLoggedIn
