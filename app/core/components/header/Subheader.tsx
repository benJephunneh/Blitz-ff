import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { ReactNode } from "react"

type SubheaderProps = {
  children?: ReactNode
}

const Subheader = ({ children }: SubheaderProps) => {
  return (
    <Box
      w="full"
      px={3}
      py={2}
      bg={useColorModeValue("gray.100", "gray.700")}
      borderBottom="1px solid"
      borderBottomColor={useColorModeValue("blackAlpha.300", "whiteAlpha.500")}
      zIndex={11}
    >
      {children}
    </Box>
  )
}

export default Subheader
