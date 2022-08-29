import { BlitzLayout } from "@blitzjs/next"
import { Container, Grid, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import Navigation from "../components/Navigation"
import PageTitle from "../components/PageTitle"

type SidebarLayoutProps = {
  title?: string
  description?: string
}

const SidebarLayout: BlitzLayout<SidebarLayoutProps> = ({
  title = "ABST",
  description,
  children,
}) => {
  console.log(`${title}`)
  return (
    <>
      <PageTitle title={title} />

      <Container as="main" minW="full" minH="full" pt={0} px={0} bg="gray.100">
        <Grid
          templateAreas={`"sidebar children"`}
          templateColumns={"1fr 4fr"}
          gap={2}
          justifyItems="left"
        >
          <GridItem area="sidebar" w="full" pt={4}>
            <Navigation />
          </GridItem>

          <GridItem area="children">{children}</GridItem>
        </Grid>
      </Container>
    </>
  )
}

export default SidebarLayout
