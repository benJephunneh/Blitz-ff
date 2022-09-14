import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
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

type HeaderProps = {
  children?: JSX.Element | null
}

const Header = ({ children }: HeaderProps) => {
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
      // console.log(`if pathname: ${pathname}`)
      // const paths = pathname.split('/')
      // if (paths.length > 1) {
      setShowBreadcrumbs(true)
      // }
    } else {
      // console.log(`else pathname: ${pathname}`)
      setShowBreadcrumbs(false)
    }
  }, [pathname]) // eslint-disable-line

  return (
    <>
      {/* <HamburgerDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} /> */}

      {/* <Box w='full' position='fixed' top={0} zIndex={3} alignItems='center'> */}
      <HStack
        as="header"
        px={3}
        py={2}
        bg={useColorModeValue("white", "gray.800")}
        borderBottom="1px solid"
        borderBottomColor={useColorModeValue("gray.100", "whiteAlpha.50")}
        justifyContent="space-between"
      >
        <HStack spacing={8}>
          <HeaderActions toggleDrawer={toggleDrawer} />
          <Box justifySelf="flex-start">
            {showBreadcrumbs ? (
              <HeaderCrumbs />
            ) : (
              <Heading size="md" display={{ base: "none", md: "block" }} textColor="#009a4c">
                Apalachee Backhoe & Septic Tank, LLC
              </Heading>
            )}
          </Box>
        </HStack>
        {isLoggedOut && <HeaderLoggedOut />}
        {isLoggedIn && <HeaderLoggedIn />}
      </HStack>

      <Box
        position="absolute"
        w="full"
        bg={useColorModeValue("gray.100", "gray.700")}
        borderBottom="1px solid"
        borderBottomColor={useColorModeValue("blackAlpha.100", "whiteAlpha.50")}
        zIndex={0}
      >
        {children}
      </Box>
      {/* </Box> */}
    </>
  )
}

export default Header
