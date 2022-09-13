import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Code,
  Container,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { useRouter } from "next/router"
import { FC, Suspense } from "react"
import { User } from "db"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import SidebarLayout from "app/core/layouts/SideBarLayout"
import SideHeaderLayout from "app/core/layouts/SideHeaderLayout"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import Link from "next/link"
import DashboardSubheader from "app/dashboard/DashboardSubheader"

type UserInfoProps = Partial<User>

const UserInfo = ({ username, role }: UserInfoProps) => {
  const [logoutMutation] = useMutation(logout)

  return (
    <>
      <HStack spacing={2}>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
          bg="gray.50"
        >
          Log out
        </Button>
        <Box>
          User: <Code fontWeight="bold">{username}</Code>
          <br />
          Role: <Code fontWeight="bold">{role}</Code>
        </Box>
      </HStack>
    </>
  )
  // }
}

const Dashboard: BlitzPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser({ suspense: false })

  return (
    <>
      <Box bg={useColorModeValue("gray.200", "gray.600")} h="full">
        <Container as="main" textAlign="center" py={{ base: 12, md: 20 }}>
          <Heading size="2xl" mb={2} mx={0}>
            {currentUser?.username}
          </Heading>
          <Text fontSize="xl" opacity="0.8">
            Ride the effluent.
          </Text>
        </Container>
      </Box>

      {/* <Container as="main" py={{ base: 12, md: 20 }} mx={0}>
        <Suspense>
          <UserInfo username={currentUser?.username} role={currentUser?.role} />
        </Suspense>
      </Container> */}

      <footer>
        <HStack spacing={2}>
          <Link
            href="https://github.com/benJephunneh/Blitz-ff"
            passHref
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button as="a" size="sm">
              Github: dev-ff
            </Button>
          </Link>
          <Link
            href="https://www.apalacheeseptic.com"
            passHref
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button as="a" size="sm">
              Apalachee Backhoe
            </Button>
          </Link>
        </HStack>
      </footer>
    </>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = { redirectTo: Routes.Home() }
Dashboard.getLayout = (page) => (
  <HeaderLayout
    title="Dashboard"
    description="Home page for ABST staff"
    subheader={<DashboardSubheader />}
  >
    {page}
  </HeaderLayout>
)

export default Dashboard
