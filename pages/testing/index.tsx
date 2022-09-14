import { BlitzPage } from "@blitzjs/next"
import { Box, Container, Flex, Heading, HStack } from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import { LoremIpsum } from "react-lorem-ipsum"
import Subheader from "./Subheader"
import TestLayout from "./TestLayout"

const Testing: BlitzPage = () => {
  return (
    <Container bg="purple" w="50vw" justifyItems="space-around">
      <LoremIpsum p={10} random={false} />
    </Container>
  )
}

Testing.getLayout = (page) => <TestLayout subheader={<Subheader />}>{page}</TestLayout>
export default Testing
