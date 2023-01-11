import { BlitzPage, Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Box, Container, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import Card from "app/core/components/Card"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import findCustomer from "app/customers/queries/findCustomer"
import CustomerSearch from "app/search/CustomerSearch"
import { useCallback, useEffect, useRef, useState } from "react"
import CreatableSelect from "react-select/creatable"
import MultiValue from "react-select/dist/declarations/src/components/MultiValue"

interface Option {
  readonly label: string
  readonly value: string
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
})

const options: readonly Option[] = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
  { label: "Four", value: "four" },
  { label: "Five", value: "five" },
  { label: "Six", value: "six" },
  { label: "Seven", value: "seven" },
  { label: "Eight", value: "eight" },
  { label: "Nine", value: "nine" },
  { label: "Ten", value: "ten" },
]

const SearchSelectPage: BlitzPage = () => {
  // const [options, setOptions] = useState<Option[]>(initialState)
  // const [query, onInputChange] = useState<string>()

  // const [items, { refetch: refetchQuery }] = useQuery(
  //   findCustomer, {
  //   query
  // }, {
  //   enabled: false,
  //   refetchOnWindowFocus: false
  // })

  // const handleCreate = (inputValue: string) => {
  //   const newOption = createOption(inputValue)
  //   setOptions(p => [
  //     ...p,
  //     newOption
  //   ])
  // }

  // const onChange = useCallback(o => {
  //   setOptions(p => [
  //     ...p,
  //     ...o,
  //   ])

  //   return onChange
  // }, [])

  return (
    <Flex maxW="100vw" maxH="100vh" minH="full" overflow="hidden" direction="column">
      <Heading ml={2} mt={4} size="md">
        Customer search
      </Heading>
      <Text ml={2} mt={2} mb={4} textColor={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
        Search for customers by first name, last name, phone, or email.
      </Text>

      <Container minH="full">
        <CreatableSelect
          autoFocus
          isClearable
          isMulti
          // isDisabled={isLoading}
          // onChange={onChange}
          options={options}
          // onCreateOption={handleCreate}
          // onInputChange={onInputChange}
        />
      </Container>
    </Flex>
  )
}

SearchSelectPage.authenticate = { redirectTo: Routes.Home() }
SearchSelectPage.getLayout = (page) => (
  <HeaderLayout title="Search" description="Find a customer">
    {page}
  </HeaderLayout>
)

export default SearchSelectPage
