import { Divider, HStack, StackProps, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface TitleDividerProps extends Partial<StackProps> {
  children?: ReactNode
}
const TitleDivider = ({ children, ...props }: TitleDividerProps) => {
  return (
    <HStack align="center" {...props}>
      <Divider />
      <Text fontSize="sm" color="gray.500" textTransform="uppercase" fontWeight="semibold">
        {children}
      </Text>
      <Divider />
    </HStack>
  )
}

export default TitleDivider
