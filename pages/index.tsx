import { Suspense, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { BlitzPage } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"

import { Box, Button, ButtonGroup, Container, HStack, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import login from "app/auth/mutations/login"
import logout from "app/auth/mutations/logout"
import signup from "app/auth/mutations/signup"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import logo from "public/logo.png"
import { FC } from "react"
import { User } from "@prisma/client"
import { useEffect } from "react"
import { useReducer } from "react"
import { UseDisclosureProps } from "@chakra-ui/react"

function UserAction(choice: string, { isOpen, onClose }) {
  switch (choice) {
    case "Login":
      return {
        modalForm: <NewUserModalForm isOpen={isOpen!} onClose={onClose!} />,
      }
    case "Signup":
      return {
        modalForm: <LoginUserModalForm isOpen={isOpen!} onClose={onClose!} />,
      }
    default:
      return {}
  }
}

type UserInfoProps = {
  currentUser: User | null
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle?: () => void
  userAction: () => void
}

const UserInfo = () => {
  const router = useRouter()
  const [loginMutation] = useMutation(login)
  const [signupMutation] = useMutation(signup)
  const [logoutMutation] = useMutation(logout)

  const [signingUp, setSigningUp] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const currentUser = useCurrentUser()

  // const { getDisclosureProps: getSignupDisclosureProps, getButtonProps: getSignupButtonProps } = useDisclosure({ id: 'signup' })
  // const signupDisclosureProps = getSignupDisclosureProps()
  // const signupButtonProps = getSignupButtonProps()

  // const { getDisclosureProps: getLoginDisclosureProps, getButtonProps: getLoginButtonProps } = useDisclosure({ id: 'login' })
  // const loginDisclosureProps = getLoginDisclosureProps()
  // const loginButtonProps = getLoginButtonProps()

  // const { isOpen: signupIsOpen, onToggle: signupToggle, onClose: signupOnClose } = useDisclosure({ id: 'signup' })
  // const { isOpen: loginIsOpen, onToggle: loginToggle, onClose: loginOnClose } = useDisclosure({ id: 'login' })

  if (currentUser) {
    return (
      <>
        <HStack spacing={2}>
          <Button
            onClick={async () => {
              await logoutMutation()
                .then(() => setSigningUp(false))
                .then(() => setLoggingIn(false))
            }}
          >
            Logout
          </Button>
          <div>
            User: <code>{currentUser.username}</code>
            <br />
            Role: <code>{currentUser.role}</code>
          </div>
        </HStack>
      </>
    )
  } else {
    return (
      <>
        <NewUserModalForm
          isOpen={signingUp}
          onClose={() => {
            setSigningUp(false)
          }}
        />
        <LoginUserModalForm
          isOpen={loggingIn}
          onClose={() => {
            setLoggingIn(false)
          }}
        />

        <HStack spacing={2}>
          <Button
            onClick={() => {
              setSigningUp(true)
            }}
            variant="outline"
            leftIcon={<FaPlus />}
            borderStyle="dashed"
            borderColor="blackAlpha.400"
            color="#009a4c"
          >
            Sign up
          </Button>
          <Button
            onClick={() => {
              setLoggingIn(true)
            }}
            color="#009a4c"
          >
            Login
          </Button>
        </HStack>
      </>
    )
  }
}

const NewHome: BlitzPage = () => {
  return (
    <>
      <Container>
        <Box as="main">
          <div className="logo">
            <Image src={`${logo.src}`} alt="blitzjs" width="256px" height="118px" layout="fixed" />
          </div>
          <p>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </p>
          <Container my={2}>
            <Suspense>
              <UserInfo />
            </Suspense>
          </Container>
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
    </>
  )
}

NewHome.suppressFirstRenderFlicker = true
// NewHome.redirectAuthenticatedTo = Routes.Dashboard()
NewHome.getLayout = (page) => <Layout>{page}</Layout>

export default NewHome
