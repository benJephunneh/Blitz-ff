import { useParam } from "@blitzjs/next"
import { HStack } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import Subheader from "app/core/components/header/Subheader"
import LocationPicker from "app/locations/components/LocationPicker"
import { useRouter } from "next/router"
import React from "react"
import { useContext } from "react"
import { createContext } from "react"
import { FcTimeline } from "react-icons/fc"
import useCustomer from "../hooks/useCustomer"
import CustomerProvider from "../providers/customerProvider"
import CustomerPicker from "./CustomerPicker"
import CustomerSubheaderActions from "./CustomerSubheaderActions"

const CustomerPickerSubheader = () => {
  return <CustomerPicker icon={FcTimeline} />
}

const LocationPickerSubheader = () => {
  return <LocationPicker icon={FcTimeline} />
}

const CustomerSubheader = () => {
  const customerId = useParam("customerId", "number")

  return (
    <CustomerProvider customerId={customerId!}>
      <Subheader>
        <HStack justify="space-between">
          <CustomerPickerSubheader />
          <CustomerSubheaderActions />
        </HStack>
      </Subheader>
    </CustomerProvider>
  )
}

export default CustomerSubheader
