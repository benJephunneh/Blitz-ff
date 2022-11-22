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
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { Location } from "@prisma/client"
import LinkCard from "app/core/components/LinkCard"
import phoneFormat from "app/core/helpers/phoneFormat"
import Link from "next/link"
import { useRouter } from "next/router"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { FcPhone } from "react-icons/fc"
import { MdAlternateEmail } from "react-icons/md"

type CustomerSearchResultProps = {
  location: Location
  props?: ComponentPropsWithoutRef<typeof LinkBox>
}

const CustomerSearchResult = ({ location, ...props }: CustomerSearchResultProps) => {
  const route = Routes.ShowCustomerPage
  const router = useRouter()
  const companynameColor = useColorModeValue("green.600", "green.300")

  return (
    <LinkCard
      position="relative"
      transition="border 50ms ease"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.100")}
      _hover={{ borderColor: useColorModeValue("blue.500", "blue.300") }}
      {...props}
    >
      <VStack alignItems="start">
        <Link href={route({ customerId: location.customerId })} passHref>
          <LinkOverlay>
            <HStack>
              <Heading size="sm">{`${location.house} ${location.street}`}</Heading>
            </HStack>
          </LinkOverlay>
        </Link>
        {/* <Tag size="sm">
                <TagLeftIcon as={FcPhone} />
                <TagLabel>{phoneFormat(customer.phone)}</TagLabel>
              </Tag> */}
        {/* <Link href={`mailto:${customer.email}`} passHref> */}
        {/* <Tag as='a' href={`mailto:${customer.email}`} size="sm" _hover={{ textDecor: 'underline', cursor: 'pointer' }}>
          <TagLeftIcon as={MdAlternateEmail} />
          <TagLabel textColor={useColorModeValue('blue.600', 'cyan.300')} fontWeight='hairline'>
            {customer.email}
          </TagLabel>
        </Tag> */}
        {/* </Link> */}
      </VStack>
    </LinkCard>
  )
}

export default CustomerSearchResult
