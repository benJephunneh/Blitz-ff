import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { BlitzPage, Routes } from "@blitzjs/next"

import { Box, Button, ButtonGroup, HStack, VStack } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import abstLogo from "public/abst logo.png"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/auth/mutations/logout"
import { useRouter } from "next/router"
import HeaderLayout from "app/core/layouts/HeaderLayout"

const UserInfo = () => {
  const router = useRouter()
  // const [loginMutation] = useMutation(login)
  // const [signupMutation] = useMutation(signup)
  const [logoutMutation] = useMutation(logout)

  const [signingUp, setSigningUp] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  // const { getDisclosureProps: getSignupDisclosureProps, getButtonProps: getSignupButtonProps } = useDisclosure({ id: 'signup' })
  // const signupDisclosureProps = getSignupDisclosureProps()
  // const signupButtonProps = getSignupButtonProps()

  // const { getDisclosureProps: getLoginDisclosureProps, getButtonProps: getLoginButtonProps } = useDisclosure({ id: 'login' })
  // const loginDisclosureProps = getLoginDisclosureProps()
  // const loginButtonProps = getLoginButtonProps()

  // const { isOpen: signupIsOpen, onToggle: signupToggle, onClose: signupOnClose } = useDisclosure({ id: 'signup' })
  // const { isOpen: loginIsOpen, onToggle: loginToggle, onClose: loginOnClose } = useDisclosure({ id: 'login' })

  // if (currentUser) {
  //   return (
  //     <>
  //       <HStack spacing={2}>
  //         <Button
  //           onClick={async () => {
  //             await logoutMutation()
  //               .then(() => setSigningUp(false))
  //               .then(() => setLoggingIn(false))
  //           }}
  //         >
  //           Logout
  //         </Button>
  //         <div>
  //           User: <code>{currentUser.username}</code>
  //           <br />
  //           Role: <code>{currentUser.role}</code>
  //         </div>
  //       </HStack>
  //     </>
  //   )
  // } else {
  return (
    <>
      <NewUserModalForm
        isOpen={signingUp}
        onClose={() => setSigningUp(false)}
        onSuccess={async () => {
          await router.push(Routes.Dashboard())
        }}
      />
      <LoginUserModalForm
        isOpen={loggingIn}
        onClose={() => setLoggingIn(false)}
        onSuccess={async () => {
          await router.push(Routes.Dashboard())
        }}
      />

      <ButtonGroup spacing={2}>
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
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Log out
        </Button>
      </ButtonGroup>
    </>
  )
}

// interface HomeProps {
//   cookies?: string
// }

const Home: BlitzPage = () => {
  return (
    <VStack alignItems="space-between">
      <HStack justifyContent="space-between">
        <Box ml={10}>
          <div className="logo">
            <Image
              src={`${abstLogo.src}`}
              alt="blitzjs"
              width="460px"
              height="116px"
              layout="fixed"
            />
          </div>
        </Box>
        <Box>
          <p>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </p>
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
        </Box>
      </HStack>
      <ButtonGroup>
        <Link
          href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button as="a" size="sm" variant="solid">
            Documentation
          </Button>
        </Link>
        <Link href="https://github.com/blitz-js/blitz" target="_blank" rel="noopener noreferrer">
          <Button as="a" size="sm" variant="solid">
            Github Repo
          </Button>
        </Link>
        <Link href="https://discord.blitzjs.com" target="_blank" rel="noopener noreferrer">
          <Button as="a" size="sm" variant="solid">
            Discord Community
          </Button>
        </Link>
      </ButtonGroup>

      <footer>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Blitz.js
        </a>
      </footer>
    </VStack>
  )
}

Home.suppressFirstRenderFlicker = true
Home.redirectAuthenticatedTo = Routes.Dashboard()
Home.getLayout = (page) => <HeaderLayout title="ABST">{page}</HeaderLayout>

export default Home
