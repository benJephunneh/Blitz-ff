import { useSession } from "@blitzjs/auth"
import { Box, Heading, HStack, Icon, useColorMode, useColorModeValue } from "@chakra-ui/react"
import userContext from "app/auth/components/contexts/userContext"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { GiMoon, GiSun } from "react-icons/gi"
import HeaderActions from "./HeaderActions"
import headerContext from "./headerContext"
import HeaderCrumbs from "./HeaderCrumbs"
import HeaderIconButton from "./HeaderIconButton"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderProvider from "./HeaderProvider"

type HeaderProps = {
  children?: JSX.Element | null
}

const Header = ({ children }: HeaderProps) => {
  const { isLoggedIn, isLoggedOut } = useContext(userContext)
  const router = useRouter()
  const pathname = router.pathname
  // const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  // const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  // const session = useSession({ suspense: false })
  // const isLoggedIn = !!session.userId
  // const isLoggedOut = !session.userId && !session.isLoading
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(isLoggedIn)

  useEffect(() => {
    if (!router.isReady) return
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
  }, [router.isReady, pathname])

  const { colorMode, toggleColorMode } = useColorMode()
  const iconColor = useColorModeValue("gray.700", "gray.200")

  return (
    <>
      {/* <HamburgerDrawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} /> */}

      <Box position="sticky" top={0}>
        <HStack
          px={3}
          py={2}
          bg={useColorModeValue("white", "gray.800")}
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue("gray.100", "whiteAlpha.100")}
          justify="space-between"
        >
          <HStack spacing={8}>
            <HeaderIconButton
              label={colorMode === "dark" ? "Bright" : "Dark"}
              onClick={toggleColorMode}
              icon={
                <Icon as={colorMode === "dark" ? GiSun : GiMoon} color={iconColor} w={8} h={8} />
              }
            />
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
      </Box>
    </>
  )
}

export default Header
