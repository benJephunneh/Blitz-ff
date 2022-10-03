import { useParam } from "@blitzjs/next"
import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/Subheader"
import DashboardSearch from "app/dashboard/DashboardSearch"
import LocationPicker from "app/locations/components/LocationPicker"
import React from "react"
import { FcTimeline } from "react-icons/fc"
import CustomerProvider from "../providers/CustomerProvider"
import CustomerPicker from "./CustomerPicker"
import CustomerPicker2 from "./CustomerPicker2"
import CustomerSubheaderActions from "./CustomerSubheaderActions"

const CustomerPickerSubheader = () => {
  return <CustomerPicker2 />
}

const LocationPickerSubheader = () => {
  return <LocationPicker icon={FcTimeline} />
}

const CustomerSubheader = () => {
  return (
    <CustomerProvider>
      <Subheader>
        <HStack justify="space-between">
          <HStack spacing={4}>
            {/* <CustomerPickerSubheader /> */}
            <LocationPickerSubheader />
            <DashboardSearch />
          </HStack>
          <CustomerSubheaderActions />
        </HStack>
      </Subheader>
    </CustomerProvider>
  )
}

export default CustomerSubheader
