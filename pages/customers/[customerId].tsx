import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import LocationList from "app/locations/components/LocationList"
import { Button, Container, Flex, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerSubheader from "app/customers/components/CustomerSubheader"

const ShowCustomerPage: BlitzPage = () => {
  const router = useRouter()

  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { id: customerId })

  const [editingCustomer, setEditingCustomer] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)

  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  // const { customer: { id, firstname, lastname } } = useContext(customerContext)

  return (
    <>
      <Flex w="100vw" bg={useColorModeValue("white", "gray.800")}>
        <VStack w="inherit">
          {/*
          <HStack w="inherit">
            <Menu>
              <MenuButton as={Button} variant="link" rightIcon={<FcExpand size={10} />}>
            <Heading
              ml={4}
              fontStyle="italic"
              textColor={useColorModeValue("#009a4c", "yellow.200")}
            >
              {firstname} {lastname}
            </Heading>
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
      */}

          <Container w="90vw" justifyContent="space-around" mt={6}>
            <LocationList customerId={customer!.id} />
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
              if (window.confirm(`OK to delete ${customer!.firstname} ${customer!.lastname}?`)) {
                await deleteCustomerMutation({ id: customer!.id }).then(() =>
                  router.push(Routes.CustomersPage())
                )
              }
            }}
          >
            Delete {`${customer!.firstname} ${customer!.lastname}`}
          </Button>
        </VStack>
      </Flex>
    </>
  )
}

ShowCustomerPage.authenticate = { redirectTo: Routes.Home() }
ShowCustomerPage.getLayout = (page) => (
  <HeaderLayout title="Customer page" subheader={<CustomerSubheader />}>
    {page}
  </HeaderLayout>
)

export default ShowCustomerPage
