import { useSession } from "@blitzjs/auth"
import { BlitzLayout } from "@blitzjs/next"
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import userContext from "app/auth/components/contexts/userContext"
import UserProvider from "app/auth/components/providers/UserProvider"
import { useContext, useState } from "react"
import Header from "../components/header/Header"
import HeaderProvider from "../components/header/HeaderProvider"
import PageTitle from "../components/PageTitle"
import { useCurrentUser } from "../hooks/useCurrentUser"

type HeaderLayoutProps = {
  title?: string
  description?: string
  // subheader?: 'Customer' | 'Location' | 'Job' | 'Invoice' | 'Estimate'
  // subheader?: JSX.Element
  children?: JSX.Element
}

const HeaderLayout: BlitzLayout<HeaderLayoutProps> = ({
  title = "ABST",
  description,
  // subheader,
  children,
}) => {
  // const { isLoggedIn, isLoggedOut } = useContext(userContext)
  const session = useSession()
  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <UserProvider>
      <Flex direction="column" h="100vh">
        <PageTitle title={title} />

        {isLoggedIn && (
          <HeaderProvider>
            {/* <Grid position="sticky" top={0} shadow="md">
              <GridItem rowSpan={1}> */}
            <Header>{children}</Header>
            {/* </GridItem> */}

            {/* {subheader && <GridItem rowSpan={1}>{subheader}</GridItem>} */}
            {/* {subheader} */}
            {/* </Grid> */}

            {/* <Box flex="1 1 auto" w="100vw" overflowX="auto" overflowY="hidden">
              {children}
            </Box> */}
          </HeaderProvider>
        )}
        {isLoggedOut && (
          <>
            <Header>{children}</Header>

            {/* <Box flex="1 1 auto" w="100vw" overflowX="auto" overflowY="hidden">
              {children}
            </Box> */}
          </>
        )}
      </Flex>
    </UserProvider>
  )
}

export default HeaderLayout
