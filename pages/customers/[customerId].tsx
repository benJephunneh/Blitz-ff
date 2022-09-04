import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import LocationList from "app/locations/components/LocationList"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import getLocations from "app/locations/queries/getLocations"
import { createRef, useState } from "react"
import { MutationType } from "app/core/components/types/MutationType"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import updateCustomer from "app/customers/mutations/updateCustomer"
import Link from "next/link"
import { TiArrowBack } from "react-icons/ti"
import TitleDivider from "app/core/components/TitleDivider"
import LocationListItem from "app/locations/components/LocationListItem"
import { FaPlus } from "react-icons/fa"
import LocationModalForm from "app/locations/components/LocationModalForm"
import createLocation from "app/locations/mutations/createLocation"
import { FcExpand } from "react-icons/fc"
import HeaderLayout from "app/core/layouts/HeaderLayout"

const ShowCustomerPage = () => {
  const router = useRouter()

  const customerId = useParam("customerId", "number")
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [customerMutationState, setCustomerMutationState] = useState("edit" as MutationType)
  const [customer] = useQuery(getCustomer, { where: { id: customerId } })
  // const [editCustomerMutation] = useMutation(updateCustomer)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  const [creatingLocation, setCreatingLocation] = useState(false)
  // const [{ locations }] = useQuery(getLocations, { where: { customerId } })
  // const [createLocationMutation] = useMutation(createLocation)
  const ref = createRef()

  return (
    <>
      <CustomerModalForm
        customerId={customerId}
        mutationType={customerMutationState}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={async () => {
          setEditingCustomer(false)
        }}
      />

      <LocationModalForm
        customerId={customerId!}
        mutationType={"New" as MutationType}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={async (_location) => {
          setCreatingLocation(false)
          await router.push(
            Routes.ShowLocationPage({ customerId: customerId!, locationId: _location.id })
          )
        }}
      />

      <Flex shadow="md" bg="white">
        <VStack spacing={4}>
          <HStack spacing={10}>
            <Menu>
              <MenuButton
                as={Button}
                ml={0}
                pl={0}
                fontSize="xl"
                fontWeight="black"
                fontStyle="italic"
                textColor="#009a4c"
                variant="link"
                rightIcon={<FcExpand size={10} />}
              >
                {customer.firstname} {customer.lastname}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setEditingCustomer(true)
                    setCustomerMutationState("Edit")
                  }}
                >
                  Edit customer
                </MenuItem>
              </MenuList>
            </Menu>
            <ButtonGroup isAttached alignSelf="start">
              <Button
                size="sm"
                borderRadius={0}
                bg="gray.100"
                textColor="#009a4c"
                variant="outline"
                borderTopWidth={0}
                onClick={() => {
                  setEditingCustomer(true)
                  setCustomerMutationState("Edit")
                }}
              >
                Edit customer
              </Button>
              <Button
                mb={4}
                size="sm"
                color="#009a4c"
                bg="gray.200"
                variant="outline"
                leftIcon={<FaPlus />}
                borderStyle="dashed"
                borderColor="blackAlpha.400"
                borderRadius={0}
                borderTopWidth={0}
                onClick={() => {
                  setCreatingLocation(true)
                  setCustomerMutationState("New")
                }}
              >
                Create location
              </Button>
            </ButtonGroup>
          </HStack>

          <TitleDivider mb={4}>Locations</TitleDivider>

          <Container borderRadius={8} mx={0} px={0}>
            <LocationList customerId={customerId!} />
          </Container>

          <Button
            mt={10}
            justifySelf="end"
            borderTopLeftRadius={0}
            borderBottomRadius={0}
            bg="red"
            textColor="white"
            size="xs"
            onClick={async () => {
              if (window.confirm(`OK to delete ${customer.firstname} ${customer.lastname}?`)) {
                await deleteCustomerMutation({ id: customer!.id }).then(() =>
                  router.push(Routes.CustomersPage())
                )
              }
            }}
          >
            Delete {`${customer.firstname} ${customer.lastname}`}
          </Button>
        </VStack>
      </Flex>
    </>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <HeaderLayout title="Customer page">{page}</HeaderLayout>

export default ShowCustomerPage
