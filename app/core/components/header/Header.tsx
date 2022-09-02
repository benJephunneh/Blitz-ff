import { useSession } from "@blitzjs/auth"
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLogo from "./HeaderLogo"

const Header = () => {
  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading

  return (
    <>
      <Box position="sticky" top={0}>
        <Box
          as="header"
          py={3}
          bg={useColorModeValue("white", "gray.700")}
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue("gray.200", "gray.50")}
        >
          <Grid
            templateAreas={`'logo title logging'`}
            templateColumns={`repeat(3, 1fr)`}
            alignItems="center"
          >
            <GridItem area="logo" ml={5} justifySelf="flex-start">
              <HeaderLogo />
            </GridItem>
            <GridItem area="title" justifySelf="center">
              <Heading size="md" display={{ base: "none", md: "block" }}>
                Apalachee Backhoe & Septic Tank, LLC
              </Heading>
            </GridItem>
            <GridItem area="logging" mr={5} justifySelf="flex-end">
              {isLoggedOut && <HeaderLoggedOut />}
              {isLoggedIn && <HeaderLoggedIn />}
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Header
