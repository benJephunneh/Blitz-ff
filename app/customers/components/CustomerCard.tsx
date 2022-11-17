import { Routes, useParam, useParams } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
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
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { Customer, Location } from "@prisma/client"
import NoteSubmission from "app/core/components/forms/NoteSubmission"
import TextAreaField from "app/core/components/forms/components/TextAreaField"
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
import InvoicesCard from "./InvoicesCard"

type CustomerCardProps = {
  // customer: Pick<
  //   Customer,
  //   "id" | "firstname" | "lastname" | "displayname" | "companyname" | "email"
  // >
  // location?: Pick<Location, "id" | "house" | "street" | "city" | "state" | "zipcode" | "phones">
  props?: SpaceProps
}

const CustomerCard = ({ ...props }: CustomerCardProps) => {
  const {
    customer,
    refetchCustomer,
    locationId,
    locations,
    refetchLocations,
    editLocation,
    jobId,
  } = useContext(headerContext)
  const location = locations?.find((l) => l.id === locationId)
  const [editingNote, setEditingNote] = useState(false)
  const router = useRouter()
  // const [location, { refetch: refetchLocation }] = useQuery(
  //   getLocation,
  //   {
  //     where: { id: locationId },
  //   },
  //   {
  //     enabled: !!locationId,
  //     refetchOnWindowFocus: false,
  //     // refetchInterval: 5000,
  //     staleTime: Infinity,
  //   }
  // )
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

  const tagBgColor = useColorModeValue("blue.100", "blue.700")
  const tabBgColor = useColorModeValue("blackAlpha.200", "gray.700")
  const locBgColor = useColorModeValue("white", "gray.300")
  const locTextColor = useColorModeValue("gray.800", "")
  // console.log(`customerId: ${customer}`)

  return (
    <Flex
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
      h="min-content"
      {...props}
    >
      <Grid
        templateAreas={`
        'address address . . . . cNotes cNotes'
        'tags . . . . . aNotes aNotes'
        `}
        gap={2}
      >
        {/* <GridItem area="name">
          <Heading fontStyle="italic" size="2xl" alignSelf="start" ml={4}>
            {customer?.displayname}
          </Heading>
        </GridItem> */}
        {/* <GridItem area="tags">
          {location && (
            <VStack justifySelf="end" display="flex" spacing={1} align="end" mt={1}>
              <Tag size="sm" bg={tagBgColor} opacity="0.9">
                <TagLeftIcon as={FcPhone} />
                <TagLabel>{phoneDisplay(location.phones!)}</TagLabel>
              </Tag>
              <Tag
                as="a"
                href={`mailto:${customer?.email}`}
                size="sm"
                bg={tagBgColor}
                opacity="0.9"
              >
                <TagLeftIcon as={MdAlternateEmail} color="cyan.400" />
                <TagLabel _hover={{ textDecoration: "underline" }}>{customer?.email}</TagLabel>
              </Tag>
            </VStack>
          )}
        </GridItem> */}
        <GridItem area="address">
          <VStack justifySelf="end" display="flex" spacing={1} align="end" mt={1}>
            {location && (
              <>
                <HStack
                  ml={2}
                  mt={2}
                  p={2}
                  borderWidth={1}
                  borderColor="blackAlpha.50"
                  borderRadius={4}
                  bg={locBgColor}
                  w="max-content"
                >
                  <Link
                    href={`http://maps.google.com/maps?q=${
                      location.house
                    }+${location.street.replace(" ", "+")},+${location.city.replace(
                      " ",
                      "+"
                    )},+${location.state.replace(" ", "+")}`}
                    passHref
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <Icon as={GiTreasureMap} w={8} h={8} mr={4} color="darkgreen" />
                    </a>
                  </Link>
                  <Text fontWeight="semibold" opacity="0.8" textColor="gray.800">
                    {location.house} {location.street}
                    <br />
                    {location.city}, {location.state} {location.zipcode}
                  </Text>
                  <IconButton
                    icon={<MdOutlineEditLocation size={25} />}
                    as={Button}
                    // size="xs"
                    aria-label="Edit location"
                    alignSelf="start"
                    onClick={editLocation}
                    bg="transparent"
                    color="darkslategray"
                    // zIndex="overlay"
                  />
                </HStack>
                <Tag size="sm" bg={tagBgColor} opacity="0.9">
                  <TagLeftIcon as={FcPhone} />
                  <TagLabel>{phoneDisplay(location.phones!)}</TagLabel>
                </Tag>
                <Tag
                  as="a"
                  href={`mailto:${customer?.email}`}
                  size="sm"
                  bg={tagBgColor}
                  opacity="0.9"
                >
                  <TagLeftIcon as={MdAlternateEmail} color="cyan.700" />
                  <TagLabel _hover={{ textDecoration: "underline" }}>{customer?.email}</TagLabel>
                </Tag>
              </>
            )}
            {!location && customer && (
              <>
                <Tag size="sm" bg={tagBgColor} opacity="0.9">
                  <TagLeftIcon as={FcPhone} />
                  <TagLabel>{phoneDisplay(customer.phone)}</TagLabel>
                </Tag>
                <Tag
                  as="a"
                  href={`mailto:${customer.email}`}
                  size="sm"
                  bg={tagBgColor}
                  opacity="0.9"
                >
                  <TagLeftIcon as={MdAlternateEmail} color="cyan.700" />
                  <TagLabel _hover={{ textDecoration: "underline" }}>{customer.email}</TagLabel>
                </Tag>
              </>
            )}
          </VStack>
        </GridItem>
        <GridItem area="aNotes">
          {location && (
            <Box minW="400px" alignSelf="start" mr={2}>
              <NoteSubmission
                modelType="Location"
                // modelId={location.customerId}
                location={location}
                onSuccess={async () => {
                  refetchCustomer()
                  refetchLocations()
                }}
              />
            </Box>
          )}
        </GridItem>
        <GridItem area="cNotes">
          <Box minW="400px" alignSelf="start" mt={2} mr={2}>
            <NoteSubmission
              modelType="Customer"
              customer={customer}
              onSuccess={() => {
                refetchCustomer()
              }}
            />
          </Box>
        </GridItem>
      </Grid>
      {/* <HStack spacing={8} justify='space-between'>
        <VStack spacing={5}>
          {location && (
            <>
              <SimpleGrid columns={2} mt={5}>
                <HStack ml={4}>
                  <Link
                    href={`http://maps.google.com/maps?q=${location.house
                      }+${location.street.replace(" ", "+")},+${location.city.replace(
                        " ",
                        "+"
                      )},+${location.state.replace(" ", "+")}`}
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
                  <IconButton
                    icon={<MdOutlineEditLocation size={25} />}
                    as={Button}
                    size="xs"
                    aria-label="Edit location"
                    alignSelf="start"
                    onClick={editLocation}
                    bg="transparent"
                  // zIndex="overlay"
                  />
                </HStack>

                <VStack justifySelf="end" display="flex" spacing={1} align="end">
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
                </VStack>
              </SimpleGrid>

              <Box minW="400px" alignSelf="start">
                <NoteSubmission
                  modelType="Location"
                  // modelId={location.customerId}
                  location={location}
                  onSuccess={async () => {
                    refetchCustomer()
                    await refetchLocation()
                  }}
                />
              </Box>
            </>
          )} */}

      <Divider my={4} borderColor={useColorModeValue("gray.300", "gray.500")} />

      <Tabs variant="enclosed" alignSelf="start" w="full" isLazy>
        <TabList>
          <Tab fontWeight="semibold" _selected={{ bg: tabBgColor }} borderColor="whiteAlpha.50">
            <Icon as={GiBulldozer} mr={2} h={6} w={6} />
            Jobs
          </Tab>

          <Tab fontWeight="semibold" _selected={{ bg: tabBgColor }} borderColor="whiteAlpha.50">
            <Icon as={GiCalculator} mr={2} h={6} w={6} />
            Estimates
          </Tab>

          <Tab fontWeight="semibold" _selected={{ bg: tabBgColor }} borderColor="whiteAlpha.50">
            <Icon as={GiBleedingWound} color="crimson" mr={2} h={6} w={6} />
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
            <InvoicesCard invoices="asdf" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Text>{jobId}</Text>
      {/* </VStack>

        <Box minW="400px" alignSelf="start" p={4}>
          <NoteSubmission
            modelType="Customer"
            customer={customer}
            onSuccess={() => {
              refetchCustomer()
            }}
          />
        </Box>
      </HStack> */}
    </Flex>
  )
}

export default CustomerCard
