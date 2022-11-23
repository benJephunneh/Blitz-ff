import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react"
import { LineItem } from "@prisma/client"
import TextAreaField from "app/core/components/forms/components/TextAreaField"
import LabeledTextField from "app/core/components/forms/LabeledTextField"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import createLineItem from "app/lineitems/mutations/createLineItem"
import updateLineItem from "app/lineitems/mutations/updateLineItem"
import findLineItem from "app/lineitems/queries/findLineItem"
import { CreateLineItem, LineItemSkeleton, notes } from "app/lineitems/validations"
import SearchInput from "app/search/SearchInput"
import SearchResults from "app/search/SearchResults"
import { validateZodSchema } from "blitz"
import { useState } from "react"
import { Form as FinalForm, Field } from "react-final-form"

const LineItemPage: BlitzPage = () => {
  const [createLineItemMutation] = useMutation(createLineItem)
  const [updateLineItemMutation] = useMutation(updateLineItem)
  const [lineItem, setLineItem] = useState<LineItem | undefined>()
  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>()
  const [cost, setCost] = useState<number | null>()
  const [notes, setNotes] = useState<string | null>()
  const [query, setQuery] = useState("")

  const [items, { isLoading }] = useQuery(
    findLineItem,
    { query },
    { refetchInterval: 2000, suspense: false, enabled: !!query }
  )

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2))
    const li = await createLineItemMutation(values)

    setLineItem(undefined)
  }

  const initialValues = {
    name: lineItem?.name,
    cost: lineItem?.cost,
    quantity: 1,
    notes: lineItem?.notes,
  }

  return (
    <Flex>
      <HStack ml={4} mt={2}>
        <VStack align="start" justify="start">
          <Heading>Create or edit a line item</Heading>

          <FinalForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            schema={CreateLineItem}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Box w={550} ml={6} mt={2}>
                  <HStack spacing={4}>
                    <LabeledTextField w={400} name="name" label="Line item name" />
                    <LabeledTextField name="cost" label="Cost" type="price" />
                  </HStack>
                  <TextAreaField
                    name="notes"
                    label="Notes"
                    placehodler="Add notes about this line item..."
                  />
                  <HStack justify="space-between">
                    <ButtonGroup isAttached>
                      <Button
                        borderTopRadius={0}
                        size="sm"
                        type="submit"
                        disabled={pristine || submitting}
                        bg="gray.200"
                      >
                        Create
                      </Button>
                      <Button
                        borderTopRadius={0}
                        size="sm"
                        disabled={!lineItem && (pristine || submitting)}
                        onClick={() => {
                          form.reset()
                          setLineItem(undefined)
                        }}
                        bgGradient="linear(to-r, gray.200, blue.100, blue.100, blue.100, blue.100, blue.100)"
                        _hover={{ bg: "blue.200" }}
                      >
                        Reset form
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup isAttached>
                      <Button
                        borderTopRadius={0}
                        size="sm"
                        disabled={!lineItem?.id || pristine || submitting}
                        bgGradient="linear(to-r, red.200, red.200, red.200, red.200, red.200, gray.100)"
                        _hover={{ bg: "red", textColor: "white" }}
                      >
                        Delete
                      </Button>
                      <Button
                        borderTopRadius={0}
                        size="sm"
                        disabled={!lineItem?.id || pristine || submitting}
                        onClick={form.reset}
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </HStack>
                  {/*
            <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Box>
              </form>
            )}
          />
        </VStack>
        <Container
          pt={4}
          alignSelf="start"
          borderWidth={1}
          borderRadius="md"
          borderColor="blue.400"
        >
          <SearchInput search={setQuery} />
          <SearchResults
            message="Search for line items..."
            query={query}
            items={items || []}
            isLoading={isLoading}
          >
            {items?.map((i, ii) => (
              <Card
                key={ii}
                onClick={() => setLineItem(i)}
                p={2}
                mb={2}
                borderWidth={1}
                transition="10ms ease"
                _hover={{ cursor: "pointer", borderColor: "blue.400" }}
              >
                {i.name}
              </Card>
            ))}
          </SearchResults>
        </Container>
      </HStack>
    </Flex>
  )
}

LineItemPage.authenticate = { redirectTo: Routes.Home() }
LineItemPage.getLayout = (page) => (
  <HeaderLayout
    title="Line item definition form"
    description="Define line items for use in invoices and estimates"
  >
    {page}
  </HeaderLayout>
)
export default LineItemPage
