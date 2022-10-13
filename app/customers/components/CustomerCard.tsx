import { Routes, useParam, useParams } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Box,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import JobPanel from "app/jobs/components/JobPanel"
import getLocation from "app/locations/queries/getLocation"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { BsReceipt } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { FcAdvertising, FcEditImage, FcHome, FcMoneyTransfer, FcPhone } from "react-icons/fc"
import {
  GiAk47,
  GiArrest,
  GiBanknote,
  GiBleedingWound,
  GiBulldozer,
  GiCalculator,
  GiChoice,
  GiFarmTractor,
  GiMoneyStack,
  GiTreasureMap,
} from "react-icons/gi"
import { MdAlternateEmail, MdOutlineEditLocation } from "react-icons/md"
import { TbBackhoe } from "react-icons/tb"
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
  const router = useRouter()
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

  const tagBgColor = useColorModeValue("white", "gray.800")
  const tabBgColor = useColorModeValue("white", "gray.800")
  // console.log(`customerId: ${customer}`)

  return (
    <Box
      py={2}
      px={2}
      display="inline"
      borderWidth={1}
      borderRadius="md"
      position="relative"
      transition="border 50ms ease"
      borderColor={useColorModeValue("gray.50", "gray.700")}
      bg={useColorModeValue("blackAlpha.100", "gray.600")}
      // _hover={{ borderColor: "blue.400" }}
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
          // zIndex="overlay"
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
              <Link
                href={`http://maps.google.com/maps?q=${location.house}+${location.street.replace(
                  " ",
                  "+"
                )},+${location.city.replace(" ", "+")},+${location.state.replace(" ", "+")}`}
                passHref
              >
                <a target="_blank" rel="noopener noreferrer">
                  <Icon as={GiTreasureMap} w={8} h={8} mr={4} />
                </a>
              </Link>
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

        <Tabs variant="enclosed" alignSelf="start" w="full" isLazy>
          <TabList>
            <Tab fontWeight="semibold" _selected={{ bg: tabBgColor }}>
              <Icon as={GiBulldozer} mr={2} h={6} w={6} />
              Jobs
            </Tab>
            <Tab fontWeight="semibold" _selected={{ bg: tabBgColor }}>
              <Icon as={GiCalculator} mr={2} h={6} w={6} />
              Estimates
            </Tab>
            <Tab fontWeight="semibold" _selected={{ bg: tabBgColor }}>
              <Icon as={GiBleedingWound} color="red" mr={2} h={6} w={6} />
              {/* x icon when open/unpaid invoices, y icon when none/paid */}
              Invoices
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <JobPanel />
            </TabPanel>
            <TabPanel>
              <Icon as={GiChoice} mr={2} />
              Pending approval:
            </TabPanel>
            <TabPanel>
              <p>Three</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
}

export default CustomerCard
