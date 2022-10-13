import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/subheader/Subheader"
import LocationPicker from "app/locations/components/LocationPicker"
import SubheaderSearch from "app/search/components/SubheaderSearch"
import React from "react"
import { FcTimeline } from "react-icons/fc"
import SubheaderProvider from "./providers/SubheaderProvider"

// const CustomerPickerSubheader = () => {
//   return <CustomerPicker2 />
// }

// const LocationPickerSubheader = () => {
//   return <LocationPicker icon={FcTimeline} />
// }

const SubheaderStack = () => {
  return (
    <SubheaderProvider>
      <Subheader>
        <HStack justify="space-between">
          <HStack spacing={4}>
            {/* <CustomerPickerSubheader /> */}
            {/* <LocationPickerSubheader /> */}
            <LocationPicker icon={FcTimeline} />
            <SubheaderSearch />
          </HStack>
          {/* <SubheaderActions /> */}
        </HStack>
      </Subheader>
    </SubheaderProvider>
  )
}

export default SubheaderStack
