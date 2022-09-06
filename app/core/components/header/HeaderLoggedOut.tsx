import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Button, ButtonGroup, HStack, useColorModeValue } from "@chakra-ui/react"
import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import logout from "app/auth/mutations/logout"
import { useRouter } from "next/router"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

const HeaderLoggedOut = () => {
  const router = useRouter()
  const [signingUp, setSigningUp] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

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

      <HStack spacing={1} justify="flex-end">
        <ButtonGroup isAttached variant="outline" size="sm">
          <Button
            color="#009a4c"
            bg={useColorModeValue("blackAlpha.100", "gray.600")}
            onClick={() => {
              setLoggingIn(true)
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            leftIcon={<FaPlus />}
            borderStyle="dashed"
            borderColor={useColorModeValue("blackAlpha.400", "gray.400")}
            color="#009a4c"
            bg={useColorModeValue("blackAlpha.100", "gray.600")}
            onClick={() => {
              setSigningUp(true)
            }}
          >
            Sign up
          </Button>
        </ButtonGroup>
      </HStack>
    </>
  )
}

export default HeaderLoggedOut
