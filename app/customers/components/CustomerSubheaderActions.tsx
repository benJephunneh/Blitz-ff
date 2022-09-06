import { Button, HStack, Icon, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import SettingsMenuButton from "app/core/components/SettingsMenuButton"
import { useContext } from "react"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { FcDoughnutChart } from "react-icons/fc"
import { TiEdit } from "react-icons/ti"
import customerContext from "../contexts/customerContext"

const CustomerSubheaderActions = () => {
  const toast = useToast()
  const [importing, setImporting] = useState(false)

  const { customer, showDetails, editCustomer } = useContext(customerContext)

  return (
    <>
      <HStack>
        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<TiEdit />} onClick={editCustomer}>
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
          onClick={showDetails}
        ></Button>
      </HStack>
    </>
  )
}

export default CustomerSubheaderActions
