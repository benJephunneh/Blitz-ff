import { BlitzPage, Routes, useParam, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import TitleDivider from "app/core/components/TitleDivider"
import { MutationType } from "app/core/components/types/MutationType"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import getCustomer from "app/customers/queries/getCustomer"
import LocationModalForm from "app/locations/components/LocationModalForm"
import deleteLocation from "app/locations/mutations/deleteLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import getLocation from "app/locations/queries/getLocation"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FcExpand } from "react-icons/fc"
import { TiArrowBack, TiEdit } from "react-icons/ti"

// Create transfer-ownership routine and button

const ITEMS_PER_PAGE = 20

type LocationPageProps = {
  customerId: number
  locationId: number
}

const ShowLocationPage: BlitzPage = () => {
  // const params = Object.assign({}, useParams())
  // console.log(`params: ${JSON.stringify(params)}`)
  // const p = processParams(params)

  const router = useRouter()
  const locationId = useParam("locationId", "number")

  const [editingLocation, setEditingLocation] = useState(false)

  const [editLocationMutation] = useMutation(updateLocation)
  const [deleteLocationMutation] = useMutation(deleteLocation)

  const [location] = useQuery(getLocation, { where: { id: locationId } })
  const [{ id, house, street, city, state, zipcode, block, lot, parcel, primary, customerId }] =
    useQuery(getLocation, { where: { id: locationId } })

  const [customer] = useQuery(getCustomer, { where: { id: customerId } })

  // const [mutationType, setMutationType] = useState("Edit" as MutationType)

  return (
    <>
      <LocationModalForm
        customerId={customerId}
        locationId={locationId}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        onSuccess={async (location) => {
          setEditingLocation(false)
          await router.push(
            Routes.ShowLocationPage({ customerId: customerId, locationId: location.id })
          )
        }}
      />

      <Flex w="100vw" bg={useColorModeValue("white", "gray.600")}>
        <VStack w="inherit" borderBottomWidth={1}>
          <Box w="inherit">
            <HStack w="inherit">
              <Menu>
                <MenuButton as={Button} variant="link" rightIcon={<FcExpand size={10} />}>
                  <Heading
                    ml={4}
                    fontStyle="italic"
                    textColor={useColorModeValue("#009a4c", "yellow.200")}
                  >
                    {customer.firstname} {customer.lastname}
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
          </Box>

          <Button
            mt={10}
            alignSelf="flex-end"
            justifySelf="right"
            borderTopRightRadius={0}
            borderBottomRadius={0}
            bg="red"
            textColor="white"
            size="xs"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteLocationMutation({ id }).then(() =>
                  router.push(Routes.ShowCustomerPage({ customerId }))
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
ShowLocationPage.getLayout = (page) => <HeaderLayout title="Location page">{page}</HeaderLayout>

export default ShowLocationPage
