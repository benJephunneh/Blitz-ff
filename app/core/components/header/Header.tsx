import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
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
  useDisclosure,
} from "@chakra-ui/react"
import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import HamburgerDrawer from "../HamburgerDrawer"
import HeaderActions from "./HeaderActions"
import HeaderCrumbs from "./HeaderCrumbs"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLogo from "./HeaderLogo"

const Header = () => {
  const router = useRouter()
  const pathname = window.location.pathname
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(false)

  useEffect(() => {
    if (pathname !== Routes.Dashboard().pathname) {
      setShowBreadcrumbs(true)
    } else {
      setShowBreadcrumbs(false)
    }
  }, [pathname])

  return (
    <>
      <HamburgerDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} />

      <Box position="sticky" top={0}>
        <Box
          as="header"
          py={3}
          bg={useColorModeValue("white", "gray.700")}
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Grid
            templateAreas={`'hamburger title logging'`}
            templateColumns={`repeat(3, 1fr)`}
            alignItems="center"
          >
            <GridItem area="hamburger" ml={5}>
              <HeaderActions toggleDrawer={toggleDrawer} />
            </GridItem>
            <GridItem area="title" justifySelf="center">
              {showBreadcrumbs ? (
                <HeaderCrumbs />
              ) : (
                <Heading size="md" display={{ base: "none", md: "block" }}>
                  Apalachee Backhoe & Septic Tank, LLC
                </Heading>
              )}
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
