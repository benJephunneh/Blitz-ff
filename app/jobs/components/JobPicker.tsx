import { Routes } from "@blitzjs/next"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import {
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import customerContext from "app/customers/contexts/customerContext"
import Link from "next/link"
import { useContext } from "react"
import { IconType } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import { FcHome } from "react-icons/fc"
import jobContext from "../contexts/jobContext"
import getJobs from "../queries/getJobs"

type JobPickerProps = {
  icon: IconType
}

const JobPicker = ({ icon }: JobPickerProps) => {
  const { job } = useContext(jobContext)
  // const [{ jobs }] = useQuery(
  //   getJobs,
  //   {
  //     where: { locationId: location.id },
  //     orderBy: [
  //       { primary: "asc" },
  //       { zipcode: "asc" },
  //       { city: "asc" },
  //       { street: "asc" },
  //       { house: "asc" },
  //     ],
  //   },
  //   { suspense: true }
  // )

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
        isTruncated
      >
        <HStack>
          <Icon as={icon} w={5} h={5} />
          {/* <Heading size="sm">
            {customer.firstname} {customer.lastname}
          </Heading> */}
        </HStack>
      </MenuButton>

      <MenuList>
        <>
          {/* {jobs.map((job) => (
            <Link
              key={job.id}
              href={Routes.ShowJobPage({ locationId: location.id, jobId: job.id })}
              passHref
            >
              <MenuItem as="a" fontWeight='semibold' fontSize='sm' icon={<FcHome />}>
                {`${job.title}`}
              </MenuItem>
            </Link>
          ))} */}
        </>
      </MenuList>
    </Menu>
  )
}

export default JobPicker
