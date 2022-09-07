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
  Spacer,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { TiEdit } from "react-icons/ti"
import { FaPlus } from "react-icons/fa"
import LocationModalForm from "app/locations/components/LocationModalForm"
import { FcExpand } from "react-icons/fc"
import HeaderLayout from "app/core/layouts/HeaderLayout"

const ShowCustomerPage = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")

  const [creatingLocation, setCreatingLocation] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(false)

  // const [customerMutationState, setCustomerMutationState] = useState<MutationType>("edit")
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const [customer] = useQuery(getCustomer, { id: customerId })

  return (
    <>
      <CustomerModalForm
        customerId={customerId}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
      />

      <LocationModalForm
        customerId={customerId!}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={(location) =>
          router.push(Routes.ShowLocationPage({ customerId: customerId!, locationId: location.id }))
        }
      />

      <Flex w="100vw" bg={useColorModeValue("white", "gray.600")}>
        <VStack w="inherit" borderBottomWidth={1}>
          <HStack w="inherit">
            {/*
            <Menu>
              <MenuButton as={Button} variant="link" rightIcon={<FcExpand size={10} />}>
      */}
            <Heading
              ml={4}
              fontStyle="italic"
              textColor={useColorModeValue("#009a4c", "yellow.200")}
            >
              {customer.firstname} {customer.lastname}
            </Heading>
            {/*
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setEditingCustomer(true)
                  }}
                >
                  Edit customer
                </MenuItem>
              </MenuList>
            </Menu>
                */}
            <Spacer />
            <ButtonGroup isAttached alignSelf="start">
              <Button
                size="sm"
                variant="outline"
                leftIcon={<TiEdit />}
                color={useColorModeValue("#009a4c", "yellow.200")}
                bg="transparent"
                borderColor={useColorModeValue("blackAlpha.100", "gray.500")}
                borderRadius={0}
                borderBottomLeftRadius={8}
                borderTopWidth={0}
                alignSelf="start"
                onClick={() => {
                  setEditingCustomer(true)
                }}
              >
                Edit customer
              </Button>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<FaPlus size={10} />}
                color={useColorModeValue("#009a4c", "yellow.200")}
                bg={useColorModeValue("cyan.50", "#009a4c")}
                borderStyle="dashed"
                borderColor={useColorModeValue("blackAlpha.400", "gray.400")}
                borderRadius={0}
                borderTopWidth={0}
                borderRightWidth={0}
                alignSelf="start"
                justifySelf="end"
                onClick={() => {
                  setCreatingLocation(true)
                }}
              >
                Create location
              </Button>
            </ButtonGroup>
          </HStack>

          <Container w="90vw" justifyContent="center">
            <LocationList customerId={customerId!} />
          </Container>
          <Button
            alignSelf="flex-end"
            justifySelf="right"
            borderTopRightRadius={0}
            borderBottomRadius={0}
            bg="red.500"
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
