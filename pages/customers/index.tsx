import { useState } from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Container, Flex, useColorModeValue } from "@chakra-ui/react"
import CustomerList from "app/customers/components/CustomerList"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import DashboardSubheader from "app/dashboard/DashboardSubheader"

const CustomersPage: BlitzPage = () => {
  return (
    <>
      <Flex
        pt={4}
        maxH="max-content"
        overflowY="hidden"
        bg={useColorModeValue("white", "gray.600")}
        justifyContent="space-around"
      >
        <CustomerList />
      </Flex>
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
