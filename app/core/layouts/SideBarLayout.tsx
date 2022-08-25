import { BlitzLayout } from "@blitzjs/next"
import { Container, Grid, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import Navigation from "../components/Navigation"

type SideBarLayoutProps = {
  title?: string
  description?: string
}

const SideBarLayout: BlitzLayout<SideBarLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Into the drainfield"}</title>
        <link rel="icon" href="/abst icon.ico" />
      </Head>

      <Container as="main" pl={0} bg="gray.100">
        <Grid
          templateAreas={`"sidebar children"`}
          templateColumns={"1fr 4fr"}
          gap={2}
          justifyItems="left"
        >
          <GridItem area="sidebar" w="full">
            <Navigation />
          </GridItem>

          <GridItem area="children">{children}</GridItem>
        </Grid>
      </Container>
    </>
  )
}

export default SideBarLayout
