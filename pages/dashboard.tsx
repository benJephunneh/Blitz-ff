import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import SidebarLayout from "app/core/components/sidebar/SideBarLayout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useRouter } from "next/router"
import { Suspense } from "react"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  // if (currentUser) {
  return (
    <>
      <Flex flexDirection="column">
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Log out
        </Button>
        <Box p={6}>
          User: <Code>{currentUser!.username}</Code>
          <br />
          Role: <Code>{currentUser!.role}</Code>
        </Box>
      </Flex>
    </>
  )
  // }
}

const Dashboard: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  return (
    <Flex>
      {/*
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container as="main" maxWidth="container.sm" textAlign="center" py={{ base: 12, md: 20 }}>
          <Heading size="2xl" mb={2}>
            {currentUser!.username}
          </Heading>
          <Text fontSize="2x" opacity="0.8">
            Ride the effluent.
          </Text>
        </Container>
      </Box>

      <Container as="main" py={{ base: 12, md: 20 }}>
        <UserInfo />
      </Container>
      */}

      <footer>
        <HStack spacing={2}>
          <Button onClick={() => router.push("https://github.com/benJephunneh/dev-ff")}>
            Github: dev-ff
          </Button>
          <Button onClick={() => router.push("https://www.apalacheeseptic.com")}>
            Apalachee Backhoe
          </Button>
        </HStack>
      </footer>
    </Flex>
  )
}

// Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = { redirectTo: Routes.Home() }
Dashboard.getLayout = (page) => (
  <SidebarLayout title="Dashboard" description="Home page for ABST staff">
    {page}
  </SidebarLayout>
)
export default Dashboard
