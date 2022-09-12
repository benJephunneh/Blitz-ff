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
        color={useColorModeValue("blackAlpha.700", "gray.300")}
        bg={useColorModeValue("blackAlpha.100", "blackAlpha.400")}
        borderColor={useColorModeValue("gray.50", "blackAlpha.50")}
        borderWidth={1}
        textColor="current"
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
