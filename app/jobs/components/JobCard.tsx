import { i } from "@blitzjs/auth/dist/index-57d74361"
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  SpaceProps,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { Job, Location } from "@prisma/client"
import headerContext from "app/core/components/header/headerContext"
import LocationCard from "app/locations/components/LocationCard"
import { isFuture, isPast } from "date-fns"
import { useContext, useEffect, useState } from "react"

type JobCardProps = {
  props?: SpaceProps
}

const JobCard = ({ ...props }: JobCardProps) => {
  const { customer, locations, pickLocation, jobs } = useContext(headerContext)
  const [incompleteJobs, setIncompleteJobs] = useState<any[]>()
  const [incompleteJobLocations, setIncompleteJobLocations] = useState<Location[]>()
  useEffect(() => {
    const j = jobs?.filter(({ completed }) => !completed)
    if (Array.isArray(j) && Array.isArray(locations)) {
      let newJobs: any[] = []
      for (let ii = 0; ii < j.length; ii++) {
        const job = j.at(ii)!
        const loc = locations.find((l) => l.id === job.locationId)
        const newJob = Object.assign(job, loc!)

        newJobs.push(newJob)
        // j.at(ii)!.location = locations?..find(l => l.id === jj?.locationId)
        // Object.assign(jj, locations?.find(l => l.id === jj?.locationId))
      }

      // console.table({ ...newJobs })
      setIncompleteJobs(newJobs)
    }

    // if (Array.isArray(j)) {
    //   const filterIds = [...j.map(({ locationId }) => locationId)]
    //   const l = [...locations!.filter(({ id }) => filterIds.includes(id))]
    //   console.table({ ...l })
    //   setIncompleteJobLocations(l)
    // }
    // setIncompleteJobs(j)
  }, [jobs])

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
      overflowX="clip"
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
            <HStack justify="space-between">
              <Heading size="sm" whiteSpace="nowrap" textOverflow="ellipsis">
                {j.title}
              </Heading>
              <Text
                ml={2}
                fontSize="sm"
                fontStyle="italic"
                textColor={isPast(j.start!) ? "red" : "cyan.700"}
                minW="max-content"
              >
                {isFuture(j.start!) ? "Future" : "Past"}
              </Text>
            </HStack>
            <Text ml={2} fontWeight="semibold" fontSize="xs">
              {incompleteJobs?.at(ii)?.house} {incompleteJobs?.at(ii)?.street},{" "}
              {incompleteJobs?.at(ii)?.city} {incompleteJobs?.at(ii)?.zipcode}
            </Text>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}

export default JobCard
