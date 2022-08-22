import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage, useRouterQuery } from "@blitzjs/next"
import { Box, Button, Container, HStack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import ModalForm from "app/core/components/ModalForm"
import NewUserForm from "app/auth/components/NewUserForm"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  const [addingUser, setAddingUser] = useState(false)

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User: <code>{currentUser.username}</code>
          <br />
          Role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <NewUserForm
          isOpen={addingUser}
          onClose={() => setAddingUser(false)}
          onSuccess={async (user) => {
            await router.push(Routes.ProfilePage({ username: user.username }))
          }}
        />
        <HStack spacing={2}>
          <Button
            onClick={() => setAddingUser(true)}
            leftIcon={<FaPlus />}
            borderStyle="dashed"
            colorScheme="blackAlpha"
            color="#009a4c"
          >
            Sign up
          </Button>
          <Button onClick={() => router.push(Routes.LoginPage())}>
            <Text as="a">Login</Text>
          </Button>
        </HStack>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Container>
        <Box as="main">
          <div className="logo">
            <Image src={`${logo.src}`} alt="blitzjs" width="256px" height="118px" layout="fixed" />
          </div>
          <p>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </p>
          <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>
          <p>
            <strong>
              To add a new model to your app, <br />
              run the following in your terminal:
            </strong>
          </p>
          <pre>
            <code>blitz generate all project name:string</code>
          </pre>
          <div style={{ marginBottom: "1rem" }}>(And select Yes to run prisma migrate)</div>
          <div>
            <p>
              Then <strong>restart the server</strong>
            </p>
            <pre>
              <code>Ctrl + c</code>
            </pre>
            <pre>
              <code>blitz dev</code>
            </pre>
            <p>
              and go to{" "}
              <Link href="/projects">
                <a>/projects</a>
              </Link>
            </p>
          </div>
          <div className="buttons" style={{ marginTop: "5rem" }}>
            <a
              className="button"
              href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              className="button-outline"
              href="https://github.com/blitz-js/blitz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Repo
            </a>
            <a
              className="button-outline"
              href="https://discord.blitzjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord Community
            </a>
          </div>
        </Box>

        <footer>
          <a
            href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Blitz.js
          </a>
        </footer>
      </Container>
    </Layout>
  )
}

export default Home
