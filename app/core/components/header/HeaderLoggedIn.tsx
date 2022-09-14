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
        color={useColorModeValue("blackAlpha.600", "gray.300")}
        bg={useColorModeValue("blackAlpha.100", "gray.700")}
        borderColor={useColorModeValue("gray.50", "blackAlpha.100")}
        borderWidth={1}
        textColor="current"
        onClick={async () => {
          await logoutMutation()
        }}
        _hover={{ bg: useColorModeValue("blackAlpha.300", "gray.900") }}
      >
        Log out
      </Button>
    </Box>
  )
}

export default HeaderLoggedIn
