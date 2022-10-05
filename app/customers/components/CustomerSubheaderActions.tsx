import { Routes } from "@blitzjs/next"
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
import { FcDoughnutChart, FcEditImage, FcFullTrash } from "react-icons/fc"
import { TiEdit } from "react-icons/ti"
import customerContext from "../contexts/customerContext"
import CustomerModalForm from "./CustomerModalForm"

const CustomerSubheaderActions = () => {
  const router = useRouter()
  const [editingCustomer, setEditingCustomer] = useState(false)
  const [creatingLocation, setCreatingLocation] = useState(false)
  const { customer, showDetails, editCustomer, deleteCustomer, refetchCustomer, createLocation } =
    useContext(customerContext)

  return (
    <>
      {/* <CustomerModalForm
        customerId={customer.id}
        isOpen={editingCustomer}
        onClose={() => setEditingCustomer(false)}
        onSuccess={() => refetchCustomer()}
      /> */}

      {/* <LocationModalForm
        customerId={customer.id}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        onSuccess={(location) =>
          router.push(Routes.ShowLocationPage({ customerId: customer.id, locationId: location.id }))
        }
      /> */}

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
          onClick={createLocation}
        >
          Create location
        </Button>
        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<FcEditImage size={15} />} onClick={editCustomer} fontWeight="semibold">
              Edit customer
            </MenuItem>
            <MenuItem
              icon={<FcFullTrash size={15} />}
              onClick={deleteCustomer}
              fontWeight="semibold"
              color="red"
              bgColor="blackAlpha.200"
            >
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
