import { BlitzLayout } from "@blitzjs/next"
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import { useState } from "react"
import Header from "../components/header/Header"
import HeaderProvider from "../components/header/HeaderProvider"
import PageTitle from "../components/PageTitle"

type HeaderLayoutProps = {
  title?: string
  description?: string
  subheader?: JSX.Element
  children?: JSX.Element
}

const HeaderLayout: BlitzLayout<HeaderLayoutProps> = ({
  title = "ABST",
  description,
  subheader,
  children,
}) => {
  return (
    <HeaderProvider>
      <Flex direction="column">
        <PageTitle title={title} />

        <Grid position="sticky" top={0} shadow="md">
          <GridItem rowSpan={1}>
            <Header />
          </GridItem>

          {subheader && <GridItem rowSpan={1}>{subheader}</GridItem>}
        </Grid>

        {children}
      </Flex>
    </HeaderProvider>
  )
}

export default HeaderLayout
