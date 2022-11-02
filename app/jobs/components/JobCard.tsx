import { i } from "@blitzjs/auth/dist/index-57d74361"
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  SpaceProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { Job, Location } from "@prisma/client"
import headerContext from "app/core/components/header/headerContext"
import { isFuture, isPast } from "date-fns"
import { useContext, useEffect, useState } from "react"

type JobCardProps = {
  props?: SpaceProps
}

const JobCard = ({ ...props }: JobCardProps) => {
  const { customer, locations, pickLocation, jobs } = useContext(headerContext)
  const [incompleteJobs, setIncompleteJobs] = useState<Job[]>()
  const [incompleteJobLocations, setIncompleteJobLocations] = useState<Location[]>()
  useEffect(() => {
    const j = jobs?.filter(({ completed }) => !completed)
    if (Array.isArray(j)) {
      const filterIds = [...j.map(({ locationId }) => locationId)]
      const l = [...locations!.filter(({ id }) => filterIds.includes(id))]
      console.table({ ...l })
      setIncompleteJobLocations(l)
    }
    console.table({ ...j })
    setIncompleteJobs(j)
  }, [jobs]) // eslint-disable-line

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
      h="min-content"
      {...props}
    >
      <Badge colorScheme="green">
        Incomplete jobs: {incompleteJobs ? incompleteJobs.length : 0}
      </Badge>
      <Box ml={4}>
        {incompleteJobs?.map((j, ii) => (
          <Box
            key={ii}
            px={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="transparent"
            transition="ease 0.1s"
            onClick={() => pickLocation(j.locationId)}
            _hover={{ borderColor: "blue.400", cursor: "pointer" }}
          >
            <HStack>
              <Heading size="md">{j.title}</Heading>
              <Text
                ml={2}
                fontSize="sm"
                fontStyle="italic"
                textColor={isPast(j.start!) ? "red" : "initial"}
              >
                {isFuture(j.start!) ? "Future" : "Past"}
              </Text>
            </HStack>
            <Text ml={2} fontWeight="semibold">
              {incompleteJobLocations?.at(ii)?.house} {incompleteJobLocations?.at(ii)?.street},{" "}
              {incompleteJobLocations?.at(ii)?.city} {incompleteJobLocations?.at(ii)?.zipcode}
            </Text>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}

export default JobCard
