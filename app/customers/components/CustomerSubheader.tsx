import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/subheader/Subheader"
import LocationPicker from "app/locations/components/LocationPicker"
import SubheaderSearch from "app/search/components/SubheaderSearch"
import React from "react"
import { FcTimeline } from "react-icons/fc"
import CustomerSubheaderActions from "./CustomerSubheaderActions"
import CustomerProvider from "../providers/CustomerProvider"

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
            {/* <LocationPickerSubheader /> */}
            <LocationPicker icon={FcTimeline} />
            <SubheaderSearch />
          </HStack>
          <CustomerSubheaderActions />
        </HStack>
      </Subheader>
    </CustomerProvider>
  )
}

export default CustomerSubheader
