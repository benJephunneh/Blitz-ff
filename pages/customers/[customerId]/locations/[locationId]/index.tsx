import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Box, Button, ButtonGroup, Heading, HStack, useColorModeValue } from "@chakra-ui/react"
import TitleDivider from "app/core/components/TitleDivider"
import { MutationType } from "app/core/components/types/MutationType"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import getCustomer from "app/customers/queries/getCustomer"
import LocationModalForm from "app/locations/components/LocationModalForm"
import deleteLocation from "app/locations/mutations/deleteLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import getLocation from "app/locations/queries/getLocation"
import getLocations from "app/locations/queries/getLocations"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FcPrevious } from "react-icons/fc"
import { TiArrowBack } from "react-icons/ti"

// Create transfer-ownership routine and button

const ITEMS_PER_PAGE = 20

type LocationPageProps = {
  customerId: number
}

const ShowLocationPage: BlitzPage = ({ customerId }: LocationPageProps) => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [location] = useQuery(getLocation, { where: { id: locationId } })
  const [{ house, street, city, state, zipcode, block, lot, parcel, primary }] = useQuery(
    getLocation,
    { where: { id: location.customerId } }
  )
  const [{ firstname, lastname }] = useQuery(getCustomer, { where: { id: customerId } })
  const [editLocationMutation] = useMutation(updateLocation)
  const [deleteLocationMutation] = useMutation(deleteLocation)
  const customerName = `${firstname} ${lastname}`

  const [editingLocation, setEditingLocation] = useState(false)
  const [mutationType, setMutationType] = useState("edit" as MutationType)
  const backgroundColor = useColorModeValue("#009a4c", "#009a4c")
  const foregroundColor = useColorModeValue("yellow", "yellow")

  return (
    <SidebarLayout title="Location page">
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
                borderTopRadius={0}
                borderBottomRightRadius={0}
                leftIcon={<TiArrowBack size={15} />}
                _hover={{ textColor: "cyan.500" }}
              >
                Back to customer page
              </Button>
            </Link>
            <Button
              size="sm"
              borderRadius={0}
              bg={backgroundColor}
              textColor={foregroundColor}
              onClick={() => {
                setEditingLocation(true)
                setMutationType("edit")
              }}
              _hover={{ bg: foregroundColor, textColor: backgroundColor }}
            >
              Edit location
            </Button>
          </ButtonGroup>
        </HStack>

        <TitleDivider>location</TitleDivider>

        <LocationModalForm
          customerId={customerId}
          locationId={locationId!}
          isOpen={editingLocation}
          onClose={() => setEditingLocation(false)}
          mutationType={mutationType}
        />

        <pre> {JSON.stringify(location, null, 2)}</pre>
        <Button
          mt={10}
          justifySelf="end"
          borderTopLeftRadius={0}
          borderBottomRightRadius={0}
          bg="red"
          textColor="white"
          size="xs"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLocationMutation({ id: location!.id }).then(() =>
                router.push(Routes.CustomersPage())
              )
            }
          }}
        >
          Delete location
        </Button>
      </Box>
    </SidebarLayout>
  )
}

export default ShowLocationPage
