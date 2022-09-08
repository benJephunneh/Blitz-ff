import { BlitzPage, Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
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
import HeaderLayout from "app/core/layouts/HeaderLayout"
import useCustomer from "app/customers/hooks/useCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import { LocationEntry } from "app/locations/components/LocationMenuList"
import LocationModalForm from "app/locations/components/LocationModalForm"
import LocationSubheader from "app/locations/components/LocationSubheader"
import locationContext from "app/locations/contexts/LocationContext"
import deleteLocation from "app/locations/mutations/deleteLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import getLocation from "app/locations/queries/getLocation"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useState } from "react"
import { TiEdit } from "react-icons/ti"

// Create transfer-ownership routine and button

const ShowLocationPage: BlitzPage = () => {
  // const params = Object.assign({}, useParams())
  // console.log(`params: ${JSON.stringify(params)}`)
  // const p = processParams(params)

  const router = useRouter()
  // const { location } = useContext(locationContext)
  const { customerId, locationId } = useParams('number')
  console.log(`customerId: ${customerId}`)
  console.log(`locationId: ${locationId}`)

  const [editingLocation, setEditingLocation] = useState(false)
  const [editLocationMutation] = useMutation(updateLocation)
  const [deleteLocationMutation] = useMutation(deleteLocation)

  const [location] = useQuery(getLocation, { id: locationId })
  const [customer] = useQuery(getCustomer, { id: customerId })
  console.log(JSON.stringify(customer))

  return (
    <>
      {/* <LocationModalForm
        customerId={customerId!}
        locationId={locationId!}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        onSuccess={() => {
          setEditingLocation(false)
        }}
      /> */}

      <Flex w="100vw" bg={useColorModeValue("white", "gray.800")}>
        <VStack w="inherit">
          {/* <Box w="inherit">
            <HStack w="inherit">
              <Menu>
                <MenuButton as={Button} variant="link" rightIcon={<FcExpand size={10} />}>
              <Heading
                ml={4}
                fontStyle="italic"
                textColor={useColorModeValue("#009a4c", "yellow.200")}
              >
                {customer?.firstname} {customer?.lastname}
              </Heading>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setEditingLocation(true)
                    }}
                  >
                    Edit location
                  </MenuItem>
                </MenuList>
              </Menu>
              <Spacer />
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
                  setEditingLocation(true)
                }}
              >
                Edit location
              </Button>
            </HStack>

            <pre>location: {JSON.stringify(location, null, 2)}</pre>
          </Box> */}

          <Container w='90vw' justifyContent='space-around' mt={6}>
            <pre>{JSON.stringify(customer, null, 2)}</pre>
          </Container>

          <Button
            mt={10}
            alignSelf="flex-end"
            justifySelf="right"
            borderTopRightRadius={0}
            borderBottomRadius={0}
            bg="red.500"
            textColor="white"
            size="xs"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteLocationMutation({ id: locationId! }).then(() =>
                  router.push(Routes.ShowCustomerPage({ customerId: customerId! }))
                )
              }
            }}
          >
            Delete location
          </Button>
        </VStack>
      </Flex>
    </>
  )
}

ShowLocationPage.authenticate = { redirectTo: Routes.Home() }
ShowLocationPage.getLayout = (page) =>
  <HeaderLayout title="Location page" subheader={<LocationSubheader />}>
    {page}
  </HeaderLayout>

export default ShowLocationPage
