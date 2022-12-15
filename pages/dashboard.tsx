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
import { useRouter } from "next/router"
import { User } from "db"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import Link from "next/link"
import DashboardSubheader from "app/dashboard/DashboardSubheader"

// type UserInfoProps = Partial<User>

// const UserInfo = ({ username, role }: UserInfoProps) => {
//   const [logoutMutation] = useMutation(logout)

//   return (
//     <>
//       <HStack spacing={2}>
//         <Button
//           onClick={async () => {
//             await logoutMutation()
//           }}
//           bg="gray.50"
//         >
//           Log out
//         </Button>
//         <Box>
//           User: <Code fontWeight="bold">{username}</Code>
//           <br />
//           Role: <Code fontWeight="bold">{role}</Code>
//         </Box>
//       </HStack>
//     </>
//   )
//   // }
// }

const Dashboard: BlitzPage = () => {
  const router = useRouter()
  const { user: currentUser } = useCurrentUser({ suspense: false })

  return (
    <Flex flexDirection='column'>
      <Box bg={useColorModeValue("gray.200", "gray.900")} h="full">
        <Container textAlign="center">
          <Heading size="2xl" my={2}>
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
        <HStack spacing={2} position="fixed" left={2} bottom={2}>
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
    </Flex>
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
