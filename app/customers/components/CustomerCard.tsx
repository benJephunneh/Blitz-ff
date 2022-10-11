import { Routes, useParam, useParams } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  SpaceProps,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { Customer, Location } from "@prisma/client"
import headerContext from "app/core/components/header/headerContext"
import phoneDisplay from "app/core/components/methods/phoneDisplay"
import getLocation from "app/locations/queries/getLocation"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FcEditImage, FcHome, FcPhone } from "react-icons/fc"
import { MdAlternateEmail, MdOutlineEditLocation } from "react-icons/md"
import customerContext from "../contexts/customerContext"
import getCustomer from "../queries/getCustomer"

type CustomerCardProps = {
  // customer: Pick<
  //   Customer,
  //   "id" | "firstname" | "lastname" | "displayname" | "companyname" | "email"
  // >
  // location?: Pick<Location, "id" | "house" | "street" | "city" | "state" | "zipcode" | "phones">
  props?: SpaceProps
}

const CustomerCard = ({ ...props }: CustomerCardProps) => {
  const { customer, locationId, editLocation } = useContext(headerContext)
  const [location, { refetch: refetchLocation }] = useQuery(
    getLocation,
    {
      where: { id: locationId },
    },
    {
      enabled: !!locationId,
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
    }
  )
  // useEffect(() => {
  //   async () => await refetchLocation()
  // }, [locationId]) // eslint-disable-line

  //// console.log(`customer (CustomerCard): ${JSON.stringify(customer)}`)
  // console.log(`location (CustomerCard): ${JSON.stringify(location)}`)
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

  const tagBgColor = useColorModeValue("khaki", "blue.700")
  // console.log(`customerId: ${customer}`)

  return (
    <LinkBox
      py={2}
      px={2}
      display="inline"
      borderRadius="md"
      borderRightRadius={0}
      borderRightWidth={3}
      position="relative"
      transition="border 50ms ease"
      borderColor={useColorModeValue("gray.50", "gray.700")}
      _hover={{ borderColor: "blue.400" }}
      {...props}
    >
      <VStack spacing={5}>
        <IconButton
          icon={<MdOutlineEditLocation size={25} />}
          as={Button}
          position="fixed"
          size="xs"
          aria-label="Edit location"
          alignSelf="start"
          onClick={editLocation}
          bg="transparent"
          zIndex="overlay"
        />
        <Heading fontStyle="italic" size="2xl">
          {/* <>
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
          </> */}
          {customer!.displayname}
        </Heading>

        {location && (
          <SimpleGrid columns={2} mt={5}>
            <HStack ml={4}>
              <Icon as={FcHome} w={8} h={8} mr={4} />
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
                <TagLabel _hover={{ textDecoration: "underline" }}>{customer!.email}</TagLabel>
              </Tag>
            </HStack>
          </SimpleGrid>
        )}
      </VStack>
    </LinkBox>
  )
}

export default CustomerCard
