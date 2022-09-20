import { Box } from "@chakra-ui/react"
import Card from "app/core/components/Card"
import { ComponentPropsWithoutRef, ReactNode } from "react"

type LocationCardProps = {
  children?: ReactNode
  props?: ComponentPropsWithoutRef<typeof Box>
}

const LocationCard = ({ children, ...props }: LocationCardProps) => {
  return (
    <Box as={Card} position="relative" h="full" transition="border 50ms ease" {...props}>
      {children}
    </Box>
  )
}

export default LocationCard
