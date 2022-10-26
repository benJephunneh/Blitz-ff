import { Routes } from "@blitzjs/next"
import {
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
} from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import LinkCard from "app/core/components/LinkCard"
import phoneFormat from "app/core/helpers/phoneFormat"
import Link from "next/link"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { FcPhone } from "react-icons/fc"
import { MdAlternateEmail } from "react-icons/md"

type CustomerSearchResultProps = {
  customer: Customer
  props?: ComponentPropsWithoutRef<typeof LinkBox>
}

const CustomerSearchResult = ({ customer, ...props }: CustomerSearchResultProps) => {
  const route = Routes.ShowCustomerPage

  return (
    <LinkCard
      position="relative"
      transition="border 50ms ease"
      _hover={{ borderColor: "blue.500" }}
      {...props}
    >
      <Link href={route({ customerId: customer.id })} passHref>
        <LinkOverlay>
          <HStack align="center" spacing={5}>
            <VStack alignItems="start">
              <Heading size="sm">{customer.displayname}</Heading>
              {/* <Tag size="sm">
                <TagLeftIcon as={FcPhone} />
                <TagLabel>{phoneFormat(customer.phone)}</TagLabel>
              </Tag> */}
              <Tag size="sm">
                <TagLeftIcon as={MdAlternateEmail} />
                <TagLabel>{customer.email}</TagLabel>
              </Tag>
            </VStack>
          </HStack>
        </LinkOverlay>
      </Link>
    </LinkCard>
  )
}

export default CustomerSearchResult
