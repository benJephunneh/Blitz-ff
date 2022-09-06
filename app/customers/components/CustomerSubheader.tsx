import { HStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import CustomerProvider from "../providers/customerProvider"
import CustomerSubheaderActions from "./CustomerSubheaderActions"

const CustomerSubheader = () => {
  const router = useRouter()
  const customerId = router.query.customerId as string

  return (
    <>
      {/* <CustomerProvider id={customerId}>
      <Subheader >
        <HStack justify='space-between'>
          <CustomerSubheaderActions />
        </HStack>
      </Subheader >
      {/* </CustomerProvider> */}
    </>
  )
}

export default CustomerSubheader
