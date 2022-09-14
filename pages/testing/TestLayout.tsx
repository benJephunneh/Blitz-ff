import { BlitzLayout } from "@blitzjs/next"
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import TestHeader from "./TestHeader"

type TestLayoutProps = {
  subheader?: JSX.Element
  children?: JSX.Element
}

const TestLayout: BlitzLayout<TestLayoutProps> = ({ subheader, children }) => {
  return (
    <Flex direction="column">
      <Grid templateRows="repeat(2, 1fr)" position="sticky" top={0}>
        <GridItem>
          <TestHeader />
        </GridItem>

        {subheader && <GridItem>{subheader}</GridItem>}
      </Grid>

      {children}
    </Flex>
  )
}

export default TestLayout
