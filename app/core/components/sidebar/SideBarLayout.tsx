import { BlitzLayout } from "@blitzjs/next"
import { Container, Grid, GridItem } from "@chakra-ui/react"
import Navigation from "../Navigation"

type SidebarLayoutProps = {
  title?: string
  description?: string
}

const SidebarLayout: BlitzLayout<SidebarLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Container as="main" maxW="container.lg" py={{ base: 5, md: 10 }}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 3fr", lg: "1fr 4fr" }} gap={12}>
          <GridItem display={{ base: "none", md: "block" }}>
            <Navigation />
          </GridItem>

          <GridItem>{children}</GridItem>
        </Grid>
      </Container>
    </>
  )
}

export default SidebarLayout
