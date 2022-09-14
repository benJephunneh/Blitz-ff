import { useState } from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react"
import CustomerList from "app/customers/components/CustomerList"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import DashboardSubheader from "app/dashboard/DashboardSubheader"

const CustomersPage: BlitzPage = () => {
  return (
    <>
      <Box
        pt={4}
        maxH="max-content"
        overflowY="hidden"
        bg={useColorModeValue("white", "gray.600")}
        justifyContent="space-around"
      >
        <CustomerList />
      </Box>
    </>
  )
}

CustomersPage.authenticate = { redirectTo: Routes.Home() }
CustomersPage.getLayout = (page) => (
  <HeaderLayout title="Customers" description="Customer list" subheader={<DashboardSubheader />}>
    {page}
  </HeaderLayout>
)

export default CustomersPage
