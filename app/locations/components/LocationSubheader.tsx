import { useParam, useParams } from "@blitzjs/next"
import { HStack } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import Subheader from "app/core/components/header/subheader/Subheader"
import LocationPicker from "app/locations/components/LocationPicker"
import { useRouter } from "next/router"
import React from "react"
import { useContext } from "react"
import { createContext } from "react"
import { FcTimeline } from "react-icons/fc"
import LocationProvider from "../providers/LocationProvider"
import LocationSubheaderActions from "./LocationSubheaderActions"

const LocationPickerSubheader = () => {
  return <LocationPicker icon={FcTimeline} />
}

const LocationSubheader = () => {
  // console.log("from location subheader:")
  // console.log(`   locationId: ${locationId}`)
  // console.log(`   customerId: ${customerId}`)

  return (
    <LocationProvider>
      <LocationPicker icon={FcTimeline} />
      {/* <Subheader>
        <HStack justify="space-between">
          <LocationSubheaderActions />
        </HStack>
      </Subheader> */}
    </LocationProvider>
  )
}

export default LocationSubheader
