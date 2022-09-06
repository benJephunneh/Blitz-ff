import { useMutation } from "@blitzjs/rpc"
import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { useRouter } from "next/router"
import { useState } from "react"

const HeaderLoggedIn = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  return (
    <Box justifyContent="flex-end">
      <Button
        size="sm"
        variant="outline"
        color={useColorModeValue("#009a4c", "gray.800")}
        bg={useColorModeValue("blackAlpha.100", "gray.600")}
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Log out
      </Button>
    </Box>
  )
}

export default HeaderLoggedIn
