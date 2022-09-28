import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Button, ButtonGroup, HStack, useColorModeValue } from "@chakra-ui/react"
import LoginUserModalForm from "app/auth/components/LoginUserModalForm"
import NewUserModalForm from "app/auth/components/NewUserModalForm"
import logout from "app/auth/mutations/logout"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { FaPlus } from "react-icons/fa"
import headerContext from "./headerContext"

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
            color={useColorModeValue("blackAlpha.600", "gray.300")}
            bg={useColorModeValue("blackAlpha.100", "gray.700")}
            borderColor={useColorModeValue("gray.50", "blackAlpha.50")}
            onClick={() => setLoggingIn(true)}
            _hover={{ bg: useColorModeValue("blackAlpha.300", "gray.900") }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            leftIcon={<FaPlus />}
            color={useColorModeValue("#009a4c", "green.300")}
            bg={useColorModeValue("blackAlpha.100", "gray.700")}
            borderColor={useColorModeValue("#009a4c", "green.300")}
            borderStyle="dashed"
            borderLeftWidth={0}
            onClick={() => setSigningUp(true)}
            _hover={{ bg: useColorModeValue("blackAlpha.300", "gray.900") }}
          >
            Sign up
          </Button>
        </ButtonGroup>
      </HStack>
    </>
  )
}

export default HeaderLoggedOut
