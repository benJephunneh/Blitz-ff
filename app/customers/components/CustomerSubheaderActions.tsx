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
import { FcDoughnutChart } from "react-icons/fc"
import { TiEdit } from "react-icons/ti"
import customerContext from "../contexts/customerContext"
import CustomerModalForm from "./CustomerModalForm"

const CustomerSubheaderActions = () => {
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)
  const { customer, showDetails, editCustomer } = useContext(customerContext)

  return (
    <>
      <CustomerModalForm
        customerId={customer.id}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={() => setEditingCustomer(false)}
      />

      <LocationModalForm
        customerId={customer.id}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={() => setCreatingLocation(false)}
      />

      <HStack>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<FaPlus size={10} />}
          color={useColorModeValue("#009a4c", "yellow.200")}
          bg="transparent"
          borderStyle="dashed"
          borderColor={useColorModeValue("cyan.800", "cyan.200")}
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
            <MenuItem icon={<TiEdit />} onClick={() => setEditingCustomer(true)}>
              Edit customer
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

export default CustomerSubheaderActions
