import { useMutation } from "@blitzjs/rpc"
import { Box, Button } from "@chakra-ui/react"
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
        color="#009a4c"
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
