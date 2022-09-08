import { useParams } from "@blitzjs/next"
import { HStack } from "@chakra-ui/react"
import Subheader from "app/core/components/header/Subheader"
import JobPicker from "app/locations/components/LocationPicker"
import React from "react"
import { FcTimeline } from "react-icons/fc"
import JobProvider from "../providers/JobProvider"
import JobSubheaderActions from "./JobSubheaderActions"

const JobPickerSubheader = () => {
  return <JobPicker icon={FcTimeline} />
}

const JobSubheader = () => {
  // const locationId = useParam("locationId", "number")
  // const customerId = useParam('customerId', 'number')
  const { customerId, locationId, jobId } = useParams('number')

  console.log(`locationId: ${locationId}`)
  console.log(`customerId: ${customerId}`)
  console.log(`jobId: ${jobId}`)

  return (
    <JobProvider jobId={jobId!} locationId={locationId!}>
      <Subheader>
        <HStack justify="space-between">
          <JobPickerSubheader />
          <JobSubheaderActions />
        </HStack>
      </Subheader>
    </JobProvider>
  )
}

export default JobSubheader
