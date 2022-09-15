import { BlitzPage, Routes } from "@blitzjs/next"
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import Card from "app/core/components/Card"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerSearch from "app/search/CustomerSearch"

type SearchPageProps = {
  initialSearch?: string
}

const SearchPage: BlitzPage = ({ initialSearch = "" }: SearchPageProps) => {
  return (
    <Box mx={4}>
      <Heading ml={2} mt={4} size="md">
        Customer search
      </Heading>
      <Text ml={2} mt={2} mb={4} textColor={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
        Search for customers by first name, last name, phone, or email.
      </Text>

      <Card>
        <CustomerSearch initialSearch={initialSearch} />
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
