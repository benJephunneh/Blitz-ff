import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"

import getCustomer from "app/customers/queries/getCustomer"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import LocationList from "app/locations/components/LocationList"
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerSubheader from "app/customers/components/CustomerSubheader"
import ConfirmDeleteModal from "app/core/components/ConfirmDeleteModal"
import getLocation from "app/locations/queries/getLocation"
import LocationCard from "app/locations/components/LocationCard"
import phoneDisplay from "app/core/components/methods/phoneDisplay"
import { FcExpand, FcFeedback, FcHome, FcMoneyTransfer, FcPhone, FcVoicemail } from "react-icons/fc"
import { BsMailbox } from "react-icons/bs"
import Link from "next/link"
import CustomerCard from "app/customers/components/CustomerCard"
import InvoicesCard from "../../app/customers/components/InvoicesCard"

const ShowCustomerPage: BlitzPage = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(
    getCustomer,
    {
      where: {
        id: customerId,
      },
      include: {
        locations: {
          where: {
            primary: true,
          },
        },
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  )
  const locations = customer.locations

  // const [location] = useQuery(
  //   getLocation, {
  //   where: {
  //     id: customerId,
  //     primary: true,
  //   },
  // }, {
  //   refetchOnWindowFocus: false,
  //   refetchInterval: 2000,
  //   refetchIntervalInBackground: true,
  // }
  // )

  // Moved to subheader:
  // const [editingCustomer, setEditingCustomer] = useState(false)
  // const [creatingLocation, setCreatingLocation] = useState(false)

  const textColor = useColorModeValue("009a4c", "yellow.200")
  // let heading: string
  // if (customer?.firstname) {
  //   heading = `${customer.firstname}`

  //   if (customer?.lastname) {
  //     heading.concat(` ${customer.lastname}`)
  //   }
  // } else {
  //   heading = `${customer?.companyname}`
  // }

  const numInvoices = 0

  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={4}>
      <HStack spacing={4} alignItems="start">
        {customer && (
          <CustomerCard customer={customer} location={locations?.at(0)} />
          // <LocationCard my={4} mx={4}>
          //   <Heading ml={4} fontStyle="italic">
          //     {heading}
          //   </Heading>
          //   <HStack spacing={10} mt={4}>
          //     <HStack ml={4} spacing={6}>
          //       <Icon as={FcHome} w={8} h={8} />
          //       <Text ml={8} mt={4} fontWeight="semibold" fontSize="xl" opacity="0.8">
          //         {location?.house} {location?.street}
          //         <br />
          //         {location?.city}, {location?.state} {location?.zipcode}
          //       </Text>
          //     </HStack>
          //     <VStack spacing={0} alignItems='start' pb={2}>
          //       <HStack mt={4}>
          //         <Icon as={FcPhone} />
          //         <Text fontSize="sm" opacity='0.8'>{phoneDisplay(location.phones.at(0)!)}</Text>
          //       </HStack>
          //       <LinkBox>
          //         <Link href={`mailto:${customer.email}`} passHref>
          //           <LinkOverlay>
          //             <HStack>
          //               <Icon as={FcFeedback} />
          //               <Text as="a" fontSize="sm" opacity='0.8'>
          //                 {customer.email}
          //               </Text>
          //             </HStack>
          //           </LinkOverlay>
          //         </Link>
          //       </LinkBox>
          //     </VStack>
          //   </HStack>
          // </LocationCard>
        )}

        <InvoicesCard invoices="asdf" />

        {/* <LinkBox
          m={4}
          p={4}
          borderWidth={1}
          borderRadius='md'
          transition='border 50ms ease'
          _hover={{ borderColor: 'blue.400' }}
        >
          <HStack spacing={6} mb={4}>
            <Heading size='lg' fontWeight='medium'>
              <Link href={Routes.SearchPage()} passHref>
                <LinkOverlay>
                  Invoices
                </LinkOverlay>
              </Link>
            </Heading>
            <Icon as={FcMoneyTransfer} w={8} h={8} />
          </HStack>
          <HStack>
            <Text fontStyle='semibold'>
              Open:
            </Text>
            <Badge variant='solid' colorScheme='red'>###</Badge>
          </HStack>
          <HStack>
            <Text fontStyle='semibold'>
              Not yet billed:
            </Text>
            <Badge variant='solid' colorScheme='yellow'>###</Badge>
          </HStack>
        </LinkBox> */}
      </HStack>
      {/*
      <VStack>
          <HStack w="inherit">
            <Menu>
              <MenuButton as={Button} variant="link" rightIcon={<FcExpand size={10} />}>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setEditingCustomer(true)
                  }}
                >
                  Edit customer
                </MenuItem>
              </MenuList>
            </Menu>
          <Spacer />
          <ButtonGroup isAttached alignSelf="start">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<TiEdit />}
              color={useColorModeValue("#009a4c", "yellow.200")}
              bg="transparent"
              borderColor={useColorModeValue("blackAlpha.100", "gray.500")}
              borderRadius={0}
              borderBottomLeftRadius={8}
              borderTopWidth={0}
              alignSelf="start"
              onClick={() => {
                setEditingCustomer(true)
              }}
            >
              Edit customer
            </Button>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<FaPlus size={10} />}
              color={useColorModeValue("#009a4c", "yellow.200")}
              bg={useColorModeValue("cyan.50", "#009a4c")}
              borderStyle="dashed"
              borderColor={useColorModeValue("blackAlpha.400", "gray.400")}
              borderRadius={0}
              borderTopWidth={0}
              borderRightWidth={0}
              alignSelf="start"
              justifySelf="end"
              onClick={() => {
                setCreatingLocation(true)
              }}
            >
              Create location
            </Button>
          </ButtonGroup>
        </HStack>

        <LocationList customerId={customer!.id} />

        <Button
          alignSelf="flex-end"
          justifySelf="right"
          borderTopRightRadius={0}
          borderBottomRadius={0}
          bg="red.500"
          textColor="white"
          size="xs"
          onClick={onOpen}
        >
          Delete {`${customer!.firstname} ${customer!.lastname}`}
        </Button>
      </VStack> */}
    </Box>
  )
}

ShowCustomerPage.authenticate = { redirectTo: Routes.Home() }
ShowCustomerPage.getLayout = (page) => (
  <HeaderLayout title="Customer page" subheader={<CustomerSubheader />}>
    {page}
  </HeaderLayout>
)

export default ShowCustomerPage
