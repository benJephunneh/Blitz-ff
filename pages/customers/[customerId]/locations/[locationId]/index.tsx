import { BlitzPage, Routes, useParam, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Box, Button, ButtonGroup, Heading, HStack, useColorModeValue } from "@chakra-ui/react"
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
import { TiArrowBack } from "react-icons/ti"

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
  const [location] = useQuery(getLocation, { where: { id: locationId } })
  const [{ id, house, street, city, state, zipcode, block, lot, parcel, primary, customerId }] =
    useQuery(getLocation, { where: { id: locationId } })
  const [{ firstname, lastname }] = useQuery(getCustomer, { where: { id: customerId } })
  const [editLocationMutation] = useMutation(updateLocation)
  const [deleteLocationMutation] = useMutation(deleteLocation)
  const customerName = `${firstname} ${lastname}`

  const [editingLocation, setEditingLocation] = useState(false)
  const [mutationType, setMutationType] = useState("Edit" as MutationType)

  return (
    <>
      <LocationModalForm
        customerId={customerId}
        locationId={locationId}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        mutationType={mutationType}
        onSuccess={async (_location) => {
          setEditingLocation(false)
          await router.push(
            Routes.ShowLocationPage({ customerId: customerId, locationId: _location.id })
          )
        }}
      />

      <Box shadow="md" bg="white">
        <HStack spacing={10}>
          <Heading ml={4}>{customerName}</Heading>
          <ButtonGroup isAttached alignSelf="start">
            <Link
              href={Routes.ShowCustomerPage({ customerId })}
              passHref
              as={`/customers/${customerId}/`}
            >
              <Button
                as="a"
                size="sm"
                variant="outline"
                bg="gray.50"
                borderTopRadius={0}
                borderBottomRightRadius={0}
                borderTopWidth={0}
                leftIcon={<TiArrowBack size={15} />}
                _hover={{ textColor: "cyan.500" }}
              >
                Back to customer page
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              borderRadius={0}
              bg="gray.100"
              textColor="#009a4c"
              borderTopWidth={0}
              onClick={() => {
                setEditingLocation(true)
                setMutationType("Edit")
              }}
            >
              Edit location
            </Button>
          </ButtonGroup>
        </HStack>

        <TitleDivider>location</TitleDivider>

        <pre>location: {JSON.stringify(location, null, 2)}</pre>
        <Button
          mt={10}
          justifySelf="end"
          borderTopLeftRadius={0}
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
      </Box>
    </>
  )
}

ShowLocationPage.authenticate = { redirectTo: Routes.Home() }
ShowLocationPage.getLayout = (page) => <HeaderLayout title="Location page">{page}</HeaderLayout>

export default ShowLocationPage
