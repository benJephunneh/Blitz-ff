import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import LocationList from "app/locations/components/LocationList"
import {
  Box,
  Button,
  Container,
  Flex,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerSubheader from "app/customers/components/CustomerSubheader"
import useCustomer from "app/customers/hooks/useCustomer"
import { GetServerSideProps } from "next"
import PrefetchQueryClient from "app/core/helpers/prefetchQueryClient"
import getLocations from "app/locations/queries/getLocations"
import { AuthenticationError, AuthorizationError, NotFoundError } from "blitz"
import ConfirmDeleteModal from "app/core/components/ConfirmDeleteModal"

const ShowCustomerPage: BlitzPage = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { id: customerId }, { refetchOnWindowFocus: false })

  // Moved to subheader:
  // const [editingCustomer, setEditingCustomer] = useState(false)
  // const [creatingLocation, setCreatingLocation] = useState(false)

  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {})

  return (
    <Box bg={useColorModeValue("white", "gray.800")}>
      <ConfirmDeleteModal
        title={`Delete ${customer?.firstname} ${customer?.lastname}?`}
        description="Are you sure you want to delete this customer and their history?  All associated locations, jobs, invoices, and estimates will also be deleted."
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={async () => {
          await deleteCustomerMutation({ id: customer!.id }).then(() =>
            router.push(Routes.CustomersPage())
          )
        }}
      />

      <VStack>
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

        <LocationList customerId={customer!.id} />

        <Button
          alignSelf="flex-end"
          justifySelf="right"
          borderTopRightRadius={0}
          borderBottomRadius={0}
          bg="red.500"
          textColor="white"
          size="xs"
          onClick={onOpen}
        >
          Delete {`${customer!.firstname} ${customer!.lastname}`}
        </Button>
      </VStack>
    </Box>
  )
}

ShowCustomerPage.authenticate = { redirectTo: Routes.Home() }
ShowCustomerPage.getLayout = (page) => (
  <HeaderLayout title="Customer page" subheader={<CustomerSubheader />}>
    {page}
  </HeaderLayout>
)

export default ShowCustomerPage
