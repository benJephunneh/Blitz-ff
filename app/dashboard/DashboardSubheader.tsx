import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/Subheader"
import CustomerPicker from "app/customers/components/CustomerPicker"
import { FcMindMap } from "react-icons/fc"
import DashboardProvider from "./dashboardProvider"
import DashboardSubheaderActions from "./DashboardSubheaderActions"
import NavigationPicker from "./NavigationPicker"

const NavigationPickerSubheader = () => {
  return <NavigationPicker icon={FcMindMap} />
}

const DashboardSubheader = () => {
  return (
    <DashboardProvider>
      <Subheader>
        <HStack justify="space-between">
          <NavigationPickerSubheader />
          <DashboardSubheaderActions />
        </HStack>
      </Subheader>
    </DashboardProvider>
  )
}

export default DashboardSubheader
