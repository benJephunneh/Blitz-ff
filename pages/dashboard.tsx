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
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { useRouter } from "next/router"
import { FC, Suspense } from "react"
import { User } from "db"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

type UserInfoProps = Partial<User>

const UserInfo: FC<UserInfoProps> = ({ username, role }) => {
  const [logoutMutation] = useMutation(logout)

  return (
    <>
      <HStack spacing={2}>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Log out
        </Button>
        <Box>
          User: <Code>{username}</Code>
          <br />
          Role: <Code>{role}</Code>
        </Box>
      </HStack>
    </>
  )
  // }
}

const Dashboard: BlitzPage = () => {
  const router = useRouter()
  // const [currentUser] = useQuery(getCurrentUser, null, { suspense: false })
  const currentUser = useCurrentUser({ suspense: false })

  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Container as="main" maxWidth="container.sm" textAlign="center" py={{ base: 12, md: 20 }}>
          <Heading size="2xl" mb={2}>
            {currentUser?.username}
          </Heading>
          <Text fontSize="2x" opacity="0.8">
            Ride the effluent.
          </Text>
        </Container>
      </Box>

      <Container as="main" py={{ base: 12, md: 20 }}>
        <Suspense>
          <UserInfo username={currentUser?.username} role={currentUser?.role} />
        </Suspense>
      </Container>

      <footer>
        <HStack spacing={2}>
          <Button onClick={() => router.push("https://github.com/benJephunneh/Blitz-ff")}>
            Github: dev-ff
          </Button>
          <Button onClick={() => router.push("https://www.apalacheeseptic.com")}>
            Apalachee Backhoe
          </Button>
        </HStack>
      </footer>
    </>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = { redirectTo: Routes.Home() }
Dashboard.getLayout = (page) => (
  <SidebarLayout title="Dashboard" description="Home page for ABST staff">
    {page}
  </SidebarLayout>
)

export default Dashboard
