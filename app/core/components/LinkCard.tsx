import { HStack, LinkBox } from "@chakra-ui/react"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import Card from "./Card"

type LinkCardProps = {
  actions?: JSX.Element
  children?: ReactNode
  props?: ComponentPropsWithoutRef<typeof LinkBox>
}

const LinkCard = ({ actions, children, ...props }) => {
  return (
    <LinkBox
      as={Card}
      position="relative"
      h="full"
      transition="border 50ms ease"
      _hover={{ borderColor: "blue.400" }}
      {...props}
    >
      {actions && (
        <HStack
          position="absolute"
          top={3}
          right={3}
          opacity="0.5"
          zIndex={2}
          _hover={{ opacity: 1 }}
        >
          {actions}
        </HStack>
      )}

      {children}
    </LinkBox>
  )
}

export default LinkCard
