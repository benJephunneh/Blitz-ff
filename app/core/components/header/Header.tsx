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
  const pathname = router.pathname
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId
  const isLoggedOut = !session.userId && !session.isLoading
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(false)

  useEffect(() => {
    if (pathname != "/dashboard" && pathname != "/") {
      console.log(`if pathname: ${pathname}`)
      // const paths = pathname.split('/')
      // if (paths.length > 1) {
      setShowBreadcrumbs(true)
      // }
    } else {
      console.log(`else pathname: ${pathname}`)
      setShowBreadcrumbs(false)
    }
  }, [pathname]) // eslint-disable-line

  return (
    <>
      <HamburgerDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} />

      <Box position="sticky" top={0}>
        <Box
          as="header"
          py={3}
          bg={useColorModeValue("white", "gray.700")}
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue("gray.200", "gray.500")}
        >
          <Grid templateColumns={`repeat(6, 1fr)`} alignItems="center">
            <GridItem colSpan={1} ml={5}>
              <HeaderActions toggleDrawer={toggleDrawer} />
            </GridItem>
            <GridItem colSpan={4} justifySelf="left">
              {showBreadcrumbs ? (
                <HeaderCrumbs />
              ) : (
                <Heading size="md" display={{ base: "none", md: "block" }}>
                  Apalachee Backhoe & Septic Tank, LLC
                </Heading>
              )}
            </GridItem>
            <GridItem colSpan={1} mr={5} justifySelf="flex-end">
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
