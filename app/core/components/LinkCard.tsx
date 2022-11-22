import { Card, HStack, LinkBox, useColorModeValue } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, ReactNode } from "react"
// import Card from "./Card"

type LinkCardProps = {
  // actions?: JSX.Element
  children?: ReactNode
  props?: ComponentPropsWithoutRef<typeof LinkBox>
}

const LinkCard = ({ children, ...props }) => {
  return (
    <LinkBox
      as={Card}
      h="full"
      px={2}
      py={2}
      borderRadius="md"
      borderWidth={1}
      variant="outline"
      bg={useColorModeValue("transparent", "gray.700")}
      overflow="hidden"
      display="block"
      {...props}
    >
      {children}
    </LinkBox>
  )
}

export default LinkCard
