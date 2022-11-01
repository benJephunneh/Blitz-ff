import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/subheader/Subheader"
import LocationPicker from "app/locations/components/LocationPicker"
import SubheaderSearch from "app/search/components/SubheaderSearch"
import React from "react"
import { FcTimeline } from "react-icons/fc"
import CustomerSubheaderActions from "./CustomerSubheaderActions"
import CustomerProvider from "../providers/CustomerProvider"
import LocationDisplay from "app/locations/components/LocationDisplay"

// const CustomerPickerSubheader = () => {
//   return <CustomerPicker2 />
// }

// const LocationPickerSubheader = () => {
//   return <LocationPicker icon={FcTimeline} />
// }

const CustomerSubheader = () => {
  return (
    <CustomerProvider>
      <Subheader>
        <HStack justify="space-between">
          <HStack spacing={4}>
            {/* <CustomerPickerSubheader /> */}
            {/* <LocationPicker icon={FcTimeline} /> */}
            <SubheaderSearch />
            <LocationDisplay />
          </HStack>
          <CustomerSubheaderActions />
        </HStack>
      </Subheader>
    </CustomerProvider>
  )
}

export default CustomerSubheader
