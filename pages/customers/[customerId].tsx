import { BlitzPage, Routes } from "@blitzjs/next"
import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerCard from "app/customers/components/CustomerCard"
import locationContext from "app/locations/contexts/LocationContext"
import { useContext } from "react"

const ShowCustomerPage: BlitzPage = () => {
  // const { customer, locationId } = useContext(headerContext)
  // const [location] = useQuery(getLocation, { where: { id: locationId } })
  // const { location } = useContext(customerContext)
  // console.log(`location ([customerId]): ${JSON.stringify(location)}`)

  const textColor = useColorModeValue("009a4c", "yellow.200")

  return (
    <Box bg={useColorModeValue("white", "gray.800")}>
      <Flex alignItems="start" p={4} position="absolute">
        <CustomerCard />
      </Flex>
    </Box>
  )
}

ShowCustomerPage.authenticate = { redirectTo: Routes.Home() }
ShowCustomerPage.getLayout = (page) => <HeaderLayout title="Customer page">{page}</HeaderLayout>

export default ShowCustomerPage
