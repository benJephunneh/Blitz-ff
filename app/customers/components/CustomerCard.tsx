import { Routes } from "@blitzjs/next"
import {
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  SpaceProps,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { Customer, Location } from "@prisma/client"
import phoneDisplay from "app/core/components/methods/phoneDisplay"
import Link from "next/link"
import { FcHome, FcPhone } from "react-icons/fc"
import { MdAlternateEmail } from "react-icons/md"

type CustomerCardProps = {
  customer: Pick<Customer, "id" | "firstname" | "lastname" | "companyname" | "email">
  location?: Pick<Location, "id" | "house" | "street" | "city" | "state" | "zipcode" | "phones">
  props?: SpaceProps
}

const CustomerCard = ({ customer, location, ...props }: CustomerCardProps) => {
  const route = Routes.ShowLocationPage
  const tagBgColor = useColorModeValue("khaki", "blue.700")

  let displayName = ""
  if (customer.firstname) {
    displayName = `${customer.firstname}`
    if (customer.lastname) {
      displayName.concat(` ${customer.lastname}`)
    }
  } else if (customer.companyname) {
    displayName = `${customer.companyname}`
  }

  console.log(`location input: ${JSON.stringify(location)}`)

  return (
    <LinkBox
      py={2}
      px={4}
      display="inline"
      borderWidth={1}
      borderRadius="md"
      position="relative"
      transition="border 50ms ease"
      _hover={{ borderColor: "blue.400" }}
      {...props}
    >
      <VStack spacing={5}>
        <Heading fontStyle="italic" size="2xl">
          <>
            {location && (
              <Link href={route({ customerId: customer.id, locationId: location.id })} passHref>
                <LinkOverlay>{displayName}</LinkOverlay>
              </Link>
            )}
            {!location && { displayName }}
          </>
        </Heading>

        {location && (
          <SimpleGrid columns={2}>
            <HStack spacing={4} ml={4}>
              <Icon as={FcHome} w={8} h={8} />
              <Text fontWeight="semibold" opacity="0.8">
                {location.house} {location.street}
                <br />
                {location.city}, {location.state} {location.zipcode}
              </Text>
            </HStack>

            <HStack display="block" alignSelf="end">
              <Tag size="sm" bg={tagBgColor} opacity="0.9">
                <TagLeftIcon as={FcPhone} />
                <TagLabel>{phoneDisplay(location.phones[0]!)}</TagLabel>
              </Tag>
              <Tag as="a" href={`mailto:${customer.email}`} size="sm" bg={tagBgColor} opacity="0.9">
                <TagLeftIcon as={MdAlternateEmail} color="cyan.400" />
                <TagLabel>{customer.email}</TagLabel>
              </Tag>
            </HStack>
          </SimpleGrid>
        )}
      </VStack>
    </LinkBox>
  )
}

export default CustomerCard
