import { useSession } from "@blitzjs/auth"
import { BlitzLayout } from "@blitzjs/next"
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import userContext from "app/auth/components/contexts/userContext"
import UserProvider from "app/auth/components/providers/UserProvider"
import { useContext, useState } from "react"
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
  const session = useSession()
  const isLoggedIn = !!session.userId

  return (
    <UserProvider>
      <HeaderProvider>
        <Flex direction="column">
          <PageTitle title={title} />

          <Grid position="sticky" top={0} shadow="md">
            <GridItem rowSpan={1}>
              <Header />
            </GridItem>

            {isLoggedIn && subheader && <GridItem rowSpan={1}>{subheader}</GridItem>}
          </Grid>

          {children}
        </Flex>
      </HeaderProvider>
    </UserProvider>
  )
}

export default HeaderLayout
