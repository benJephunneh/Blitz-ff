import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { ReactNode } from "react"

type SubheaderProps = {
  children?: ReactNode
}

const Subheader = ({ children }: SubheaderProps) => {
  return <Box position="absolute">{children}</Box>
}

export default Subheader
