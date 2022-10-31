import {
  Button,
  HStack,
  Icon,
  MenuItem,
  MenuList,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import SettingsMenuButton from "app/core/components/SettingsMenuButton"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import LocationModalForm from "app/locations/components/LocationModalForm"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useState } from "react"
import { FaArrowRight, FaPlus } from "react-icons/fa"
import { FcDoughnutChart } from "react-icons/fc"
import { TiEdit } from "react-icons/ti"
import locationContext from "../contexts/locationContext"

const LocationSubheaderActions = () => {
  const [editingLocation, setEditingLocation] = useState(false)
  const { location, showDetails, editLocation, refetchLocation } = useContext(locationContext)

  return (
    <>
      <LocationModalForm
        customerId={location!.customerId}
        locationId={location?.id}
        isOpen={editingLocation}
        onClose={() => setEditingLocation(false)}
        onSuccess={() => refetchLocation()}
      />

      <HStack>
        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<TiEdit />} onClick={() => setEditingLocation(true)}>
              Edit location
            </MenuItem>
          </MenuList>
        </SettingsMenuButton>

        <Button
          size="sm"
          leftIcon={<Icon w={5} h={5} as={FcDoughnutChart} />}
          rightIcon={<Icon w={5} h={5} as={FaArrowRight} />}
          fontWeight="bold"
          variant="outline"
          colorScheme="blue"
        ></Button>
      </HStack>
    </>
  )
}

export default LocationSubheaderActions
