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
            color={useColorModeValue("blackAlpha.700", "gray.300")}
            bg={useColorModeValue("blackAlpha.100", "blackAlpha.400")}
            borderColor={useColorModeValue("gray.50", "gray.600")}
            onClick={() => {
              setLoggingIn(true)
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            leftIcon={<FaPlus />}
            color={useColorModeValue("cyan.600", "cyan.300")}
            bg={useColorModeValue("blackAlpha.100", "blackAlpha.400")}
            borderColor={useColorModeValue("cyan.600", "cyan.300")}
            borderStyle="dashed"
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
