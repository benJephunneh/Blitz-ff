import {
  Button,
  HStack,
  Icon,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import SettingsMenuButton from "app/core/components/SettingsMenuButton"
import JobModalForm from "app/locations/components/LocationModalForm"
import { useContext } from "react"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { FcDoughnutChart } from "react-icons/fc"
import { TiEdit } from "react-icons/ti"
import jobContext from "../contexts/JobContext"

const JobSubheaderActions = () => {
  const [editingJob, setEditingJob] = useState(false)
  const { job, showDetails, editJob, refetchJob } = useContext(jobContext)

  return (
    <>
      <JobModalForm
        customerId={job.locationId}
        locationId={job.id}
        isOpen={editingJob}
        onClose={() => setEditingJob(false)}
        onSuccess={() => refetchJob()}
      />

      <HStack>
        <SettingsMenuButton>
          <MenuList>
            <MenuItem icon={<TiEdit />} onClick={() => setEditingJob(true)}>
              Edit job
            </MenuItem>
          </MenuList>
        </SettingsMenuButton>

        <Button
          size="sm"
          leftIcon={<Icon w={5} h={5} as={FcDoughnutChart} />}
          rightIcon={<Icon w={5} h={5} as={FaArrowRight} />}
          fontWeight="bold"
          variant="outline"
          colorScheme="blue"
        ></Button>
      </HStack>
    </>
  )
}

export default JobSubheaderActions
