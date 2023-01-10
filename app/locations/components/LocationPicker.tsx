import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import headerContext from "app/core/components/header/headerContext"
import { useContext } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcFile, FcHome } from "react-icons/fc"

type LocationPickerProps = {
  icon: IconType
}

const LocationPicker = ({ icon }: LocationPickerProps) => {
  const { pickLocation, locations } = useContext(headerContext)
  // const { locations, gotoLocation } = useContext(customerContext)
  // const [locations, { refetch: refetchLocations }] = useQuery(
  //   getLocations,
  //   {
  //     where: { customerId: customer?.id },
  //     orderBy: [
  //       { primary: "desc" },
  //       { zipcode: "asc" },
  //       { city: "asc" },
  //       { street: "asc" },
  //       { house: "asc" },
  //     ],
  //   },
  //   {
  //     suspense: false,
  //     refetchOnWindowFocus: false,
  //     refetchInterval: 2000,
  //     refetchIntervalInBackground: true,
  //   }
  // )

  // const primaryLocation = locations?.locations.at(0)

  return (
    <Box>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          variant="solid"
          px={1}
          rightIcon={<Icon pr={1} as={FaChevronDown} />}
          bg="gray.100"
          _hover={{ bg: "white" }}
        >
          <HStack>
            <Icon as={icon} w={5} h={5} />
            <Heading size="sm" opacity={useColorModeValue("0.7", "0.9")}>
              Location list
              {/* {`${primaryLocation?.house} ${primaryLocation?.street}, ${primaryLocation?.city}  ${primaryLocation?.zipcode}`} */}
              {/* {customer?.firstname} {customer?.lastname} */}
            </Heading>
          </HStack>
        </MenuButton>

        <MenuList>
          {locations?.map((location) => (
            // <Link
            //   key={location.id}
            //   href={Routes.ShowLocationPage({ customerId: customer?.id, locationId: location.id })}
            //   passHref
            // >
            <MenuItem key={location.id} onClick={() => pickLocation(location.id)}>
              <HStack>
                <Text fontWeight="semibold">
                  {`${location.house} ${location.street}, ${location.city}  ${location.zipcode}`}
                </Text>
                {location.primary && (
                  <Text fontSize="xs" color="orange">
                    (primary)
                  </Text>
                )}
              </HStack>
            </MenuItem>
            // </Link>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default LocationPicker
