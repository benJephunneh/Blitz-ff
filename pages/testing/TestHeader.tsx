import { Box, HStack } from "@chakra-ui/react"

type TestHeaderProps = {
  subheader?: JSX.Element
}

const TestHeader = () => {
  return (
    <Box w="full" bg="tomato" zIndex={10}>
      <HStack justify="space-between">
        <Box>Top</Box>
        <Box>This</Box>
        <Box>That</Box>
        <Box>The other thing</Box>
      </HStack>
    </Box>
  )
}

export default TestHeader
