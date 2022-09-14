import { BlitzPage, Routes } from "@blitzjs/next"
import { Box, Heading, Text } from "@chakra-ui/react"
import Card from "app/core/components/Card"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerSearch from "app/search/CustomerSearch"

const SearchPage: BlitzPage = () => {
  return (
    <Box mx={4} bg="gray">
      <Heading mt={0} size="md">
        Customer search
      </Heading>

      <Card>
        <CustomerSearch />
      </Card>
    </Box>
  )
}

SearchPage.authenticate = { redirectTo: Routes.Home() }
SearchPage.getLayout = (page) => (
  <HeaderLayout title="Search" description="Find a customer">
    {page}
  </HeaderLayout>
)

export default SearchPage
