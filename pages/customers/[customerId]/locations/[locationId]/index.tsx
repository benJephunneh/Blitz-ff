import { BlitzPage, Routes, useParams } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Container,
  Flex,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import getCustomer from "app/customers/queries/getCustomer"
import LocationSubheader from "app/locations/components/LocationSubheader"
import locationContext from "app/locations/contexts/LocationContext"
import deleteLocation from "app/locations/mutations/deleteLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import getLocation from "app/locations/queries/getLocation"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { GiRayGun } from "react-icons/gi"

// Create transfer-ownership routine and button

const ShowLocationPage: BlitzPage = () => {
  // const params = Object.assign({}, useParams())
  // console.log(`params: ${JSON.stringify(params)}`)
  // const p = processParams(params)

  const router = useRouter()
  const { customerId, locationId } = useParams("number")
  // console.log("from location index:")
  // console.log(`   customerId: ${customerId}`)
  // console.log(`   locationId: ${locationId}`)
  const [location] = useQuery(getLocation, { where: { id: 1 } }, { suspense: false })
  const [customer] = useQuery(getCustomer, { where: { id: customerId } }, { suspense: false })

  const [editingLocation, setEditingLocation] = useState(false)
  const [editLocationMutation] = useMutation(updateLocation)
  const [deleteLocationMutation] = useMutation(deleteLocation)

  return (
    <Box bg={useColorModeValue("white", "gray.800")}>
      <Flex alignItems="start">
        <Box
          h={100}
          w={500}
          bg={useColorModeValue("gray.200", "gray.700")}
          borderWidth={2}
          borderRadius={8}
          borderColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Box m={10} justifyContent="space-around">
            <Text fontWeight="semibold" size="sm">
              {`${location?.house} ${location?.street} ${location?.city}  ${location?.zipcode}`}
            </Text>
          </Box>
        </Box>

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

          </Box> */}

          <Container w="90vw" justifyContent="space-around" mt={6}>
            <pre>{JSON.stringify(customer, null, 2)}</pre>
            <pre>{JSON.stringify(location, null, 2)}</pre>
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
    </Box>
  )
}

ShowLocationPage.authenticate = { redirectTo: Routes.Home() }
ShowLocationPage.getLayout = (page) => (
  <HeaderLayout title="Location page" subheader={<LocationSubheader />}>
    {page}
  </HeaderLayout>
)

export default ShowLocationPage
