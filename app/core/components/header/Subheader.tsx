import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { ReactNode } from "react"

type SubheaderProps = {
  children?: ReactNode
}

const Subheader = ({ children }: SubheaderProps) => {
  return (
    <Box
      position="sticky"
      top={14}
      py={2}
      bg={useColorModeValue("gray.100", "gray.700")}
      borderBottom="1px solid"
      borderBottomColor={useColorModeValue("blackAlpha.100", "blackAlpha.50")}
      zIndex={0}
    >
      <Container maxW="full">{children}</Container>
    </Box>
  )
}

export default Subheader
