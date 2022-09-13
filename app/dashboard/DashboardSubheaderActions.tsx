import { Button, HStack, useColorModeValue } from "@chakra-ui/react"
import CustomerModalForm from "app/customers/components/CustomerModalForm"
import { useContext } from "react"
import { FaPlus } from "react-icons/fa"
import dashboardContext from "./dashboardContext"

const DashboardSubheaderActions = () => {
  const { addCustomer, addJob } = useContext(dashboardContext)

  return (
    <>
      <HStack>
        <Button
          size="sm"
          variant="outline"
          borderStyle="dashed"
          color={useColorModeValue("cyan.500", "cyan.200")}
          bgColor="transparent"
          borderColor={useColorModeValue("gray.400", "gray.500")}
          leftIcon={<FaPlus size={10} />}
          onClick={addCustomer}
          _hover={{ bg: useColorModeValue("blackAlpha.200", "gray.800") }}
        >
          Add customer
        </Button>
        {/* <Button
          size='sm'
          variant='outline'
          borderStyle='dashed'
          color={useColorModeValue('#009a4c', 'green.300')}
          borderColor={useColorModeValue('#009a4c', 'green.300')}
          leftIcon={<FaPlus size={10} />}
          onClick={addJob}
        >
          Add job
        </Button> */}
      </HStack>
    </>
  )
}

export default DashboardSubheaderActions
