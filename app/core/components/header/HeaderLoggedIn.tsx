import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
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
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import getStashes from "app/stashes/queries/getStashes"
import { FcFullTrash } from "react-icons/fc"
import deleteStash from "app/stashes/mutations/deleteStash"
import LocationModalForm from "app/locations/components/LocationModalForm"

const HeaderLoggedIn = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const [deleteStashMutation] = useMutation(deleteStash)

  const [editingCustomer, setEditingCustomer] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  // const [stashingCustomer, setStashingCustomer] = useState(false)
  const [stashId, setStashId] = useState<number>()
  const [customerId, setCustomerId] = useState<number>()
  // const [customerStash, setCustomerStash] = useState<CustomerStash>()
  const [{ customerStashes, locationStashes, count: numStashes }, { refetch: refetchStashes }] =
    useQuery(
      getStashes,
      {},
      {
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
        // refetchIntervalInBackground: true,
      }
    )

  // const [editingLocation, setEditingLocation] = useState(false)
  // const [editingJob, setEditingJob] = useState(false)
  // const [editingInvoice, setEditingInvoice] = useState(false)
  // const [editingEstimate, setEditingEstimate] = useState(false)

  const stashKeyframes = keyframes`
    from { background-color: red; color: white }
      to { background-color: ${useColorModeValue("white", "black")}; color: red }`
  const stashAnimation = `${stashKeyframes} 1s alternate infinite`

  // const parsed = JSON.parse(customerStashes[0]!.notes)
  // console.log(parsed.content[0].content[0].text)

  return (
    <Box justifyContent="flex-end">
      <CustomerModalForm
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
      />

      <LocationModalForm
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
              router
                .push(Routes.ShowLocationPage({ customerId: customerId!, locationId: location.id }))
                .catch((e) => console.log(`HeaderLogggedIn createLocation error: ${e}`))
            }
          }
        }}
      />

      <HStack spacing={4}>
        <Menu isLazy closeOnSelect={false}>
          <Button
            as={MenuButton}
            size="sm"
            colorScheme={numStashes ? "red" : "blue"}
            animation={numStashes && stashAnimation}
            variant={numStashes ? "solid" : "ghost"}
            opacity={numStashes ? "1" : "0.5"}
          >
            {`${numStashes} stashed`}
          </Button>
          <MenuList>
            {customerStashes.map((c, ii) => (
              // <MenuItem key={ii} fontWeight='semibold' onClick={() => editStash(c.id, c.stashType)}>
              <MenuItem key={ii} fontWeight="semibold">
                <Text
                  textOverflow="ellipsis"
                  onClick={() => {
                    setStashId(c.id)
                    // setCustomerStash(c)
                    setEditingCustomer(true)
                  }}
                >
                  {c.displayname}: {JSON.parse(c.notes).content[0].content[0].text}
                </Text>
                <Spacer />
                <Icon
                  as={FcFullTrash}
                  h={5}
                  w={5}
                  onClick={async () => {
                    deleteStashMutation({ id: c.id, stashType: "Customer" })
                      .then(() => refetchStashes())
                      .catch((e) => console.log(`Error deleting customer stash: ${e}`))
                  }}
                />
              </MenuItem>
            ))}
            {locationStashes.map((l, jj) => (
              <MenuItem key={jj} fontWeight="semibold">
                <Text
                  textOverflow="ellipsis"
                  onClick={() => {
                    setStashId(l.id)
                    setCustomerId(l.customerId)
                    setEditingLocation(true)
                  }}
                >
                  {l.house} {l.street}: {JSON.parse(l.notes).content[0].content[0].text}
                </Text>
                <Spacer />
                <Icon
                  as={FcFullTrash}
                  h={5}
                  w={5}
                  onClick={async () => {
                    deleteStashMutation({ id: l.id, stashType: "Location" })
                      .then(() => refetchStashes())
                      .catch((e) => console.log(`Error deleting location stash: ${e}`))
                  }}
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
