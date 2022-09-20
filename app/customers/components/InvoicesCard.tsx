import { Routes } from "@blitzjs/next"
import { LinkBox, HStack, Heading, LinkOverlay, Icon, Badge, Text } from "@chakra-ui/react"
import Link from "next/link"
import { FcMoneyTransfer } from "react-icons/fc"

const InvoicesCard = ({ invoices }: { invoices: string }) => {
  return (
    <LinkBox
      m={4}
      p={4}
      borderWidth={1}
      borderRadius="md"
      transition="border 50ms ease"
      _hover={{ borderColor: "blue.400" }}
    >
      <HStack spacing={6} mb={4}>
        <Heading size="lg" fontWeight="medium">
          <Link href={Routes.SearchPage()} passHref>
            <LinkOverlay>Invoices</LinkOverlay>
          </Link>
        </Heading>
        <Icon as={FcMoneyTransfer} w={8} h={8} />
      </HStack>
      <HStack>
        <Text fontStyle="semibold">Open:</Text>
        <Badge variant="solid" colorScheme="red">
          ###
        </Badge>
      </HStack>
      <HStack>
        <Text fontStyle="semibold">Not yet billed:</Text>
        <Badge variant="solid" colorScheme="yellow">
          ###
        </Badge>
      </HStack>
    </LinkBox>
  )
}

export default InvoicesCard
