import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  NumberIncrementStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useNumberInput,
} from "@chakra-ui/react"
import { Job, LineItem } from "@prisma/client"
import useCustomer from "app/customers/hooks/useCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import getCustomerData from "app/customers/queries/getCustomerData"
import { useJobs } from "app/jobs/hooks/useJobs"
import { useEffect, useState } from "react"

const AllJobsPage: BlitzPage = () => {
  const [jobs, setJobs] = useState<(Job & { lineitems: LineItem[] })[]>()
  const [locationInputValues, setLocationInputValues] = useState([1099, 1, 999999])
  const {
    value: customerValue,
    getInputProps: getCustomerInputProps,
    getIncrementButtonProps: getCustomerIncrementButtonProps,
    getDecrementButtonProps: getCustomerDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 733,
    min: 1,
    max: 999999,
  })
  const {
    value: locationValue,
    getInputProps: getLocationInputProps,
    getIncrementButtonProps: getLocationIncrementButtonProps,
    getDecrementButtonProps: getLocationDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1099,
    min: 1,
    max: 999999,
  })
  const customerInc = getCustomerIncrementButtonProps()
  const customerDec = getCustomerDecrementButtonProps()
  const customerInput = getCustomerInputProps()
  const locationInc = getLocationIncrementButtonProps()
  const locationDec = getLocationDecrementButtonProps()
  const locationInput = getLocationInputProps()

  // const { jobs: tempJobs, refetch } = useJobs({ customerId: +customerValue })
  // const { customer: tempCustomer } = useCustomer({ customerId: +customerValue })
  const [customerData, { refetch: refetchCustomerData }] = useQuery(
    getCustomerData,
    {
      id: +customerValue,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  )
  useEffect(() => {
    refetchCustomerData()
      .then(() => {
        const tempJobs = customerData?.locations.find(({ id }) => id === +locationValue)?.jobs
        setJobs(tempJobs)
      })
      .catch(console.error)
  }, [customerValue]) // eslint-disable-line
  console.table(customerData)

  return (
    <Flex p={4} flexDirection="column" maxW="min-content">
      <Table h="400px">
        <TableContainer>
          <TableCaption>Jobs page</TableCaption>
          <Thead>
            <Tr>
              <Th textColor="red">Job ID</Th>
              <Th textColor="red">Title</Th>
              <Th textColor="red">Completed?</Th>
              <Th textColor="red">Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs?.map((j, ii) => (
              <Tr key={ii}>
                <Td>{j.id}</Td>
                <Td>{j.title}</Td>
                <Td>{j.completed}</Td>
                <Td>{j.notes}</Td>
              </Tr>
            ))}
          </Tbody>
        </TableContainer>
      </Table>
      <Text mt={4} align="center" fontWeight="semibold">
        Customer ID
      </Text>
      <HStack>
        <Button {...customerDec}>-</Button>
        <Input {...customerInput} />
        <Button {...customerInc}>+</Button>
      </HStack>
      <Text mt={4} align="center" fontWeight="semibold">
        Location ID
      </Text>
      <HStack>
        <Button {...locationDec}>-</Button>
        <Input {...locationInput} />
        <Button {...locationInc}>+</Button>
      </HStack>
    </Flex>
  )
}

export default AllJobsPage
