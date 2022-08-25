import { FC, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { RouteUrlObject } from "blitz"
import { Box, Heading, HStack, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { FcHome } from "react-icons/fc"
import { useState } from "react"

type NavigationItemProps = {
  route: RouteUrlObject
  icon: IconType
  children?: ReactNode
}

const NavigationItem: FC<NavigationItemProps> = ({ route, icon, children }) => {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  if (!isActive && router.pathname === route.pathname) {
    setIsActive(true)
  }

  const bgColor = useColorModeValue("gray.50", "gray.700")
  const activeBgColor = useColorModeValue("gray.50", "gray.900")
  const activeColor = useColorModeValue("blue.400", "cyan.400")

  return (
    <Link href={route} passHref>
      <HStack
        as="a"
        bg={isActive ? activeBgColor : "transparent"}
        _hover={{ bg: isActive ? activeBgColor : bgColor }}
        py={2}
        px={3}
      >
        <Icon as={icon} size={5} mr={1} />
        <Text color={isActive ? activeColor : ""} fontWeight="bold">
          {children}
        </Text>
      </HStack>
    </Link>
  )
}

type NavigationExternalItemProps = {
  href: string
  icon: IconType
  children?: ReactNode
}

const NavigationExternalItem: FC<NavigationExternalItemProps> = ({ href, icon, children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700")

  return (
    <HStack
      as="a"
      href={href}
      _hover={{ bg: bgColor }}
      borderRadius="md"
      display="flex"
      alignItems="center"
      py={2}
      px={3}
    >
      <Icon as={icon} size={5} mr={1} />
      <Text fontWeight="bold">{children}</Text>
    </HStack>
  )
}

const NavigationSection: FC<{ title?: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <Stack as="section" spacing={2}>
      {title && (
        <Heading fontSize="xs" textTransform="uppercase" pl={3} pb={2} color="gray.500">
          {title}
        </Heading>
      )}

      {children}
    </Stack>
  )
}

const Navigation = () => {
  return (
    <Box as="aside">
      <Stack as="aside" spacing={4}>
        <NavigationSection title="Apalachee">
          <NavigationItem route={Routes.Dashboard()} icon={FcHome}>
            Home
          </NavigationItem>
          <NavigationItem route={Routes.CustomersPage()} icon={FcHome}>
            Customers
          </NavigationItem>
        </NavigationSection>
      </Stack>
    </Box>
  )
}

export default Navigation
