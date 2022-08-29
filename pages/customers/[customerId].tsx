import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import LocationList from "app/locations/components/LocationList"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react"
import getLocations from "app/locations/queries/getLocations"
import { createRef, useState } from "react"
import { MutationType } from "app/core/components/types/MutationType"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import SidebarLayout from "app/core/layouts/SideBarLayout"

const CustomerDisplay = () => {
  const toast = useToast()
  const router = useRouter()
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [mutationState, setMutationState] = useState("edit")
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { where: { id: customerId } })
  const [{ locations }] = useQuery(getLocations, { where: { customerId } })
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const ref = createRef()

  // if (Array.isArray(customer.locations)) {
  //   console.log('yay')
  // }

  return (
    <>
      <Box shadow="md" bg="white">
        <HStack spacing={10}>
          <Heading mt={0}>
            {customer?.firstname} {customer.lastname}
          </Heading>
          <ButtonGroup alignSelf="start" isAttached variant="outline">
            <Button
              borderTopWidth={0}
              borderTopRadius={0}
              bg="#009a4c"
              textColor="yellow"
              onClick={() => {
                setEditingCustomer(true)
                setMutationState("edit")
              }}
            >
              Edit customer
            </Button>
            <Button
              borderTopWidth={0}
              borderTopRadius={0}
              borderRightWidth={0}
              borderRightRadius={0}
              bg="red"
              textColor="white"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteCustomerMutation({ id: customer!.id }).then(() =>
                    router.push(Routes.CustomersPage())
                  )
                }
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </HStack>

        <Flex bg="inherit" direction="column">
          <List>
            <>
              {locations.map((location, ii) => {
                return (
                  <ListItem key={ii}>
                    <LocationList customerId={customerId!} />
                  </ListItem>
                )
              })}
            </>
          </List>
        </Flex>

        <CustomerModalForm
          mutationType={mutationState as MutationType}
          isOpen={editingCustomer}
          onClose={() => {
            setEditingCustomer(false)
          }}
          onSuccess={async () => {
            toast({
              title: "Finished editing",
              description: "Successfully edit",
              status: "success",
            })
          }}
        />
      </Box>
    </>
  )
}

const ShowCustomerPage: BlitzPage = () => {
  return (
    <>
      <CustomerDisplay />
    </>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <SidebarLayout title="Customer page">{page}</SidebarLayout>

export default ShowCustomerPage
