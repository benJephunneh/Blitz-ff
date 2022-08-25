import { BlitzLayout } from "@blitzjs/next"
import { Container, Grid, GridItem, Heading } from "@chakra-ui/react"
import Head from "next/head"
import { Suspense } from "react"
import Navigation from "../components/Navigation"

type SidebarLayoutProps = {
  title?: string
  description?: string
}

const SidebarLayout: BlitzLayout<SidebarLayoutProps> = ({ title, description, children }) => {
  return (
    // <>
    <Suspense
      fallback={
        <Head>
          <title>Loading</title>
        </Head>
      }
    >
      <Head>
        <title>{title || "Into the drainfield"}</title>
        <link rel="icon" href="/abst icon.ico" />
      </Head>
      <Grid templateColumns={{ base: "1fr", md: "1fr 3fr", lg: "1fr 4fr" }} gap={12}>
        <GridItem display={{ base: "none", md: "block" }}>
          <Navigation />
        </GridItem>

        <GridItem>{children}</GridItem>
      </Grid>
    </Suspense>
    // </>
  )
}

export default SidebarLayout
