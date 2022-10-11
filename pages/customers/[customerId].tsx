import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import HeaderLayout from "app/core/layouts/HeaderLayout"
import CustomerSubheader from "app/customers/components/CustomerSubheader"
import CustomerCard from "app/customers/components/CustomerCard"
import InvoicesCard from "../../app/customers/components/InvoicesCard"
import { useContext, useState } from "react"
import customerContext from "app/customers/contexts/customerContext"
import { useQuery } from "@blitzjs/rpc"
import getCustomer from "app/customers/queries/getCustomer"
import headerContext from "app/core/components/header/headerContext"
import getLocation from "app/locations/queries/getLocation"
import { FcAdvertising, FcDoughnutChart, FcElectricalSensor, FcPlus } from "react-icons/fc"
import { FaEgg } from "react-icons/fa"

const ShowCustomerPage: BlitzPage = () => {
  // const { customer, locationId } = useContext(headerContext)
  // const [location] = useQuery(getLocation, { where: { id: locationId } })
  // const { location } = useContext(customerContext)
  // console.log(`location ([customerId]): ${JSON.stringify(location)}`)

  const textColor = useColorModeValue("009a4c", "yellow.200")

  return (
    <Box bg={useColorModeValue("white", "gray.800")}>
      {/* <StashModalForm
        customerId={customerId}
        isOpen={stashing}
        onClose={() => setStashing(false)}
        onSuccess={() => {
          setStashing(false)
        }}
      /> */}

      <Flex alignItems="start" p={4}>
        <HStack borderRadius="md" bg={useColorModeValue("blackAlpha.100", "gray.600")}>
          <CustomerCard />
          <VStack alignContent="space-between">
            <ButtonGroup isAttached flexDirection="column" variant="ghost" alignItems="start">
              <Button aria-label="adfe" rightIcon={<FcPlus />}>
                Jobs
              </Button>
              {/* <Spacer /> */}
              <Button aria-label="adfk" rightIcon={<FcPlus />}>
                Estimates
              </Button>
              {/* <Spacer /> */}
              <Button aria-label="asdf" rightIcon={<FcPlus />}>
                Invoices
              </Button>
            </ButtonGroup>
          </VStack>
        </HStack>
        {/* <LocationCard my={4} mx={4}>
            <Heading ml={4} fontStyle="italic">
              {heading}
            </Heading>
            <HStack spacing={10} mt={4}>
              <HStack ml={4} spacing={6}>
                <Icon as={FcHome} w={8} h={8} />
                <Text ml={8} mt={4} fontWeight="semibold" fontSize="xl" opacity="0.8">
                  {location?.house} {location?.street}
                  <br />
                  {location?.city}, {location?.state} {location?.zipcode}
                </Text>
              </HStack>
              <VStack spacing={0} alignItems='start' pb={2}>
                <HStack mt={4}>
                  <Icon as={FcPhone} />
                  <Text fontSize="sm" opacity='0.8'>{phoneDisplay(location.phones.at(0)!)}</Text>
                </HStack>
                <LinkBox>
                  <Link href={`mailto:${customer.email}`} passHref>
                    <LinkOverlay>
                      <HStack>
                        <Icon as={FcFeedback} />
                        <Text as="a" fontSize="sm" opacity='0.8'>
                          {customer.email}
                        </Text>
                      </HStack>
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </VStack>
            </HStack>
          </LocationCard> */}

        <Spacer />

        <InvoicesCard invoices="asdf" />
      </Flex>
      {/* <Button
        colorScheme="telegram"
        justifySelf="end"
        alignSelf="end"
        rightIcon={<FaPlus />}
        onClick={() => setStashing(true)}
      >
        Stash
      </Button> */}
    </Box>
  )
}

ShowCustomerPage.authenticate = { redirectTo: Routes.Home() }
ShowCustomerPage.getLayout = (page) => (
  <HeaderLayout title="Customer page" subheader={<CustomerSubheader />}>
    {page}
  </HeaderLayout>
)

// export async function getServerSideProps(ctx) {
//   const client = new PrefetchQueryClient(ctx)

//   try {
//     const customerId = ctx.params?.customerId as string
//     await client.prefetchQuery(getCustomer, { where: { id: customerId } })
//   } catch (e) {
//     if (e instanceof AuthenticationError) {
//       return {
//         redirect: {
//           destination: Routes.Home(),
//           permanent: false,
//         },
//       }
//     } else if (
//       e instanceof NotFoundError ||
//       e instanceof AuthorizationError
//     ) {
//       return { notFound: true }
//     } else {
//       throw e
//     }
//   }

//   return {
//     props: {
//       dehydratedState: client.dehydrate(),
//     },
//   }
// }

export default ShowCustomerPage
