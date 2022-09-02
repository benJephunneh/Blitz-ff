import { BlitzLayout } from "@blitzjs/next"
import { Box, Container, Flex, Grid, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import Header from "../components/header/Header"
import Navigation from "../components/Navigation"
import PageTitle from "../components/PageTitle"

type SideHeaderLayoutProps = {
  title?: string
  description?: string
}

const SideHeaderLayout: BlitzLayout<SideHeaderLayoutProps> = ({
  title = "ABST",
  description,
  children,
}) => {
  console.log(`${title}`)
  return (
    <>
      <PageTitle title={title} />

      <Header />

      <Flex as="main" w="100vw" h="100vh" pt={0} px={0} bg="gray.100">
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
      </Flex>
    </>
  )
}

export default SideHeaderLayout
