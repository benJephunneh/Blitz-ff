import { Routes, useParam, useParams } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
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
import { useContext, useState } from "react"
import { FcHome, FcPhone } from "react-icons/fc"
import { MdAlternateEmail } from "react-icons/md"
import customerContext from "../contexts/customerContext"
import getCustomer from "../queries/getCustomer"

type CustomerCardProps = {
  customer: Pick<
    Customer,
    "id" | "firstname" | "lastname" | "displayname" | "companyname" | "email"
  >
  location?: Pick<Location, "id" | "house" | "street" | "city" | "state" | "zipcode" | "phones">
  props?: SpaceProps
}

const CustomerCard = ({ customer, location, ...props }: CustomerCardProps) => {
  // const { customerId, locationId } = useParams('number')
  // const [location, setLocation] = useState<Location>()
  // console.log(`customerId: ${customerId}`)
  // const [customer] = useQuery(
  //   getCustomer, {
  //   where: { id: customerId },
  //   include: {
  //     locations: {
  //       orderBy: {
  //         primary: 'desc'
  //       }
  //     }
  //   }
  // }, {
  //   enabled: !!customerId,
  //   refetchOnWindowFocus: false,
  //   // refetchInterval: 2000,
  //   // refetchIntervalInBackground: true,
  // })

  const locations: Location[] = customer!["locations"]
  // function findLocation(l) {
  //   return l.id === locationId
  // }

  // if (1 in locations) {
  //   if (!locationId) setLocation(locations.at(0)!) // set to primary location
  //   else {
  //     const ii = locations.findIndex(findLocation)
  //     setLocation(locations.at(ii)!)
  //   }
  // }

  const tagBgColor = useColorModeValue("khaki", "blue.700")
  // console.log(`customerId: ${customer}`)

  return (
    <LinkBox
      py={2}
      px={2}
      display="inline"
      borderWidth={1}
      borderRadius="md"
      position="relative"
      transition="border 50ms ease"
      bg={useColorModeValue("blackAlpha.100", "gray.600")}
      borderColor={useColorModeValue("gray.50", "gray.700")}
      _hover={{ borderColor: "blue.400" }}
      {...props}
    >
      <VStack spacing={5}>
        <Heading fontStyle="italic" size="2xl">
          <>
            {location ? (
              <Link
                href={Routes.ShowLocationPage({
                  customerId: customer!.id,
                  locationId: location.id,
                })}
                passHref
              >
                <LinkOverlay>{customer!.displayname}</LinkOverlay>
              </Link>
            ) : (
              <>{customer!.displayname}</>
            )}
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
                <TagLabel>{phoneDisplay(location.phones!)}</TagLabel>
              </Tag>
              <Tag
                as="a"
                href={`mailto:${customer!.email}`}
                size="sm"
                bg={tagBgColor}
                opacity="0.9"
              >
                <TagLeftIcon as={MdAlternateEmail} color="cyan.400" />
                <TagLabel>{customer!.email}</TagLabel>
              </Tag>
            </HStack>
          </SimpleGrid>
        )}
      </VStack>
    </LinkBox>
  )
}

export default CustomerCard
