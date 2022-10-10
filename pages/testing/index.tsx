import { BlitzPage } from "@blitzjs/next"
import { Box, Button, Container, Flex, Heading, HStack, Switch } from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import { useEffect, useState } from "react"
import { LoremIpsum } from "react-lorem-ipsum"
import Subheader from "./Subheader"
import TestLayout from "./TestLayout"

const Testing: BlitzPage = () => {
  const [numP, setNumP] = useState(1)
  useEffect(() => {
    console.log(`numP: ${numP}`)
  }, [numP])
  return (
    <Container bg="purple" w="50vw" justifyItems="space-around">
      <Button onClick={() => setNumP(numP === 1 ? 2 : 1)}>do it</Button>
      <LoremIpsum p={numP} random={false} />
    </Container>
  )
}

// Testing.getLayout = (page) => <TestLayout subheader={<Subheader />}>{page}</TestLayout>
export default Testing
