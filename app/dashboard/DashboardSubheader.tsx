import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/Subheader"
import { FcMindMap } from "react-icons/fc"
import DashboardProvider from "./dashboardProvider"
import NavigationPicker from "./NavigationPicker"

const NavigationPickerSubheader = () => {
  return <NavigationPicker icon={FcMindMap} />
}

const DashboardSubheader = () => {
  return (
    <DashboardProvider>
      <Subheader>
        <HStack justify="space-between"></HStack>
        <NavigationPickerSubheader />
        {/* <DashboardSubheaderActions /> */}
      </Subheader>
    </DashboardProvider>
  )
}

export default DashboardSubheader
