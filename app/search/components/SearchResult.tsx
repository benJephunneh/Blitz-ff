import { Routes } from "@blitzjs/next"
import {
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
} from "@chakra-ui/react"
import { Customer, Location } from "@prisma/client"
import headerContext from "app/core/components/header/headerContext"
import LinkCard from "app/core/components/LinkCard"
import Link from "next/link"
import { ComponentPropsWithoutRef, useContext } from "react"
import { MdAlternateEmail } from "react-icons/md"

type SearchResultProps = {
  result: Customer | Location
  props?: ComponentPropsWithoutRef<typeof LinkBox>
}

const SearchResult = ({ result, ...props }: SearchResultProps) => {
  const { customer } = useContext(headerContext)
  const route = Routes.ShowCustomerPage
  const href =
    "firstname" in result
      ? route({ customerId: result.id })
      : route({ customerId: result.customerId })
  const heading = "firstname" in result ? result.displayname : `${result.house} ${result.street}`

  return (
    <LinkCard
      position="relative"
      transition="border 50ms ease"
      _hover={{ borderColor: "blue.500" }}
      {...props}
    >
      <Link href={href} passHref>
        <LinkOverlay>
          <HStack align="center" spacing={5}>
            <Heading size="sm">{heading}</Heading>
            <VStack alignItems="start">
              {/* <Tag size="sm">
                <TagLeftIcon as={FcPhone} />
                <TagLabel>{phoneFormat(customer.phone)}</TagLabel>
              </Tag> */}
              <Tag size="sm">
                <TagLeftIcon as={MdAlternateEmail} />
                <TagLabel>{customer?.email}</TagLabel>
              </Tag>
            </VStack>
          </HStack>
        </LinkOverlay>
      </Link>
    </LinkCard>
  )
}

export default SearchResult
