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
import LocationModalForm from "app/locations/components/LocationModalForm"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useState } from "react"
import { FaArrowRight, FaPlus } from "react-icons/fa"
import { FcDoughnutChart, FcFullTrash } from "react-icons/fc"
import { TiEdit } from "react-icons/ti"
import customerContext from "../contexts/customerContext"
import CustomerModalForm from "./CustomerModalForm"

const CustomerSubheaderActions = () => {
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)
  const { customer, showDetails, editCustomer, deleteCustomer, refetchCustomer, refetchLocations } =
    useContext(customerContext)

  return (
    <>
      <CustomerModalForm
        customerId={customer.id}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={() => refetchCustomer()}
      />

      <LocationModalForm
        customerId={customer.id}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={() => refetchLocations()}
      />

      <HStack>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<FaPlus size={10} />}
          color={useColorModeValue("#009a4c", "blue.200")}
          bg="transparent"
          borderStyle="dashed"
          borderColor={useColorModeValue("cyan.800", "blue.200")}
          alignSelf="start"
          justifySelf="end"
          onClick={() => {
            setCreatingLocation(true)
          }}
        >
          Create location
        </Button>
        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<TiEdit />} onClick={editCustomer} fontWeight="semibold">
              Edit customer
            </MenuItem>
            <MenuItem icon={<FcFullTrash />} onClick={deleteCustomer} fontWeight="semibold">
              Delete customer
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
          onClick={showDetails}
        >
          $(bal)
        </Button>
      </HStack>
    </>
  )
}

export default CustomerSubheaderActions
