import { useSession } from "@blitzjs/auth"
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tooltip,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import userContext from "app/auth/components/contexts/userContext"
import LocationPicker from "app/locations/components/LocationPicker"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { FcPhone, FcTimeline } from "react-icons/fc"
import { GiMoon, GiSun } from "react-icons/gi"
import FilePicker from "../FilePicker"
import phoneDisplay from "../methods/phoneDisplay"
import HeaderActions from "./HeaderActions"
import headerContext from "./headerContext"
import HeaderCrumbs from "./HeaderCrumbs"
import HeaderIconButton from "./HeaderIconButton"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderProvider from "./HeaderProvider"
import DataPicker from "./subheader/components/DataPicker"

type HeaderProps = {
  children?: JSX.Element
}

const Header = ({ children }: HeaderProps) => {
  const { isLoggedIn, isLoggedOut } = useContext(userContext)
  const { customer, customerId } = useContext(headerContext)
  const router = useRouter()
  const pathname = router.pathname
  // const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  // const toggleDrawer = () => setDrawerIsOpen((state) => !state)

  // const session = useSession({ suspense: false })
  // const isLoggedIn = !!session.userId
  // const isLoggedOut = !session.userId && !session.isLoading
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(isLoggedIn)

  // console.table({ ...customer })

  useEffect(() => {
    if (!router.isReady) return
    if (pathname !== "/dashboard" && pathname !== "/") {
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
      <Box position="sticky" top={0} zIndex={3} boxShadow={useColorModeValue("md", "lg")}>
        <Box
          as="header"
          bg={useColorModeValue("white", "gray.800")}
          borderBottom={1}
          borderBottomColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          transition="border 0.2s ease"
        >
          <HStack px={3} py={2} justify="space-between">
            <HStack spacing={8}>
              <HeaderIconButton
                label={useColorModeValue("Dark", "Bright")}
                onClick={toggleColorMode}
                icon={
                  <Icon as={colorMode === "dark" ? GiSun : GiMoon} color={iconColor} w={8} h={8} />
                }
              />
              <Box justifySelf="flex-start">
                {showBreadcrumbs ? (
                  <HStack>
                    <HeaderCrumbs pathname={pathname} />
                    {customer && (
                      <VStack spacing={0} align="start">
                        <Badge variant="subtle" colorScheme="gray">
                          {phoneDisplay(customer.phone)}
                        </Badge>
                        <Badge
                          variant="subtle"
                          colorScheme="gray"
                          as="a"
                          href={`mailto:${customer.email}`}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {customer.email}
                        </Badge>
                      </VStack>
                    )}
                  </HStack>
                ) : (
                  <Heading size="md" display={{ base: "none", md: "block" }} textColor="#009a4c">
                    Apalachee Backhoe & Septic Tank, LLC
                  </Heading>
                )}
              </Box>

              {customerId && <LocationPicker icon={FcTimeline} />}
              {customerId && <FilePicker />}
            </HStack>
            {isLoggedOut && <HeaderLoggedOut />}
            {isLoggedIn && <HeaderLoggedIn />}
          </HStack>
        </Box>
      </Box>
    </>
  )
}

export default Header
