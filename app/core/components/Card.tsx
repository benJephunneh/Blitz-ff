import { Box, useColorModeValue } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, ReactNode } from "react"

type CardProps = {
  children?: ReactNode
  props?: ComponentPropsWithoutRef<typeof Box>
}

const Card = ({ children, ...props }: CardProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.800")
  const borderWidth = useColorModeValue("2px", "1px")
  const bgColor = useColorModeValue("white", "gray.700")

  return (
    <Box
      px={4}
      py={6}
      borderRadius="md"
      border={`${borderWidth} solid`}
      borderColor={borderColor}
      bg={bgColor}
      w="full"
      overflow="hidden"
      display="block"
      {...props}
    >
      {children}
    </Box>
  )
}

export default Card
