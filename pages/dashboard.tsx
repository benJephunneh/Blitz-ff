import { BlitzPage, Routes } from "@blitzjs/next"
import { Box, Button, Container, Heading, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import Link from "next/link"

const Dashboard: BlitzPage = () => {
  const router = useRouter()
  const { user: currentUser } = useCurrentUser({ suspense: false })

  return (
    <>
      <Box bg={useColorModeValue("gray.200", "gray.600")} h="full">
        <Container textAlign="center">
          <Heading size="2xl" my={2}>
            {currentUser?.username}
          </Heading>
          <Text fontSize="xl" opacity="0.8">
            Ride the effluent.
          </Text>
        </Container>
      </Box>

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
    </>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = { redirectTo: Routes.Home() }
Dashboard.getLayout = (page) => (
  <HeaderLayout title="Dashboard" description="Home page for ABST staff">
    {page}
  </HeaderLayout>
)

export default Dashboard
