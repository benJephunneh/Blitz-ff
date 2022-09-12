import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { ReactNode } from "react"

type SubheaderProps = {
  children?: ReactNode
}

const Subheader = ({ children }: SubheaderProps) => {
  return (
    <Box
      py={2}
      borderBottom="1px solid"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "gray.600")}
      zIndex={2}
    >
      <Container maxW="full">{children}</Container>
    </Box>
  )
}

export default Subheader
