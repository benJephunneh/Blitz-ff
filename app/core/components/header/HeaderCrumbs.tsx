import { Routes, useParams } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react"
import getCustomer from "app/customers/queries/getCustomer"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import headerContext from "./headerContext"

type HeaderCrumbsProps = {
  pathname: string
}

const HeaderCrumbs = ({ pathname }: HeaderCrumbsProps) => {
  // const pathname = window.location.pathname
  const paths = pathname.split("/")
  const { customerId, locationId, jobId } = useParams("number")
  const { customer } = useContext(headerContext)
  // const [customer] = useQuery(
  //   getCustomer,
  //   {
  //     where: {
  //       id: customerId,
  //     },
  //   },
  //   {
  //     enabled: !!customerId,
  //     refetchOnWindowFocus: false,
  //   }
  // )
  const [displayname, setDisplayname] = useState(customer?.displayname)
  // console.log(JSON.stringify(customer))
  // Parse pathname (regex) to array, then map to BreadcrumItems
  // const pages = new RegExp('^\/?(\w*)\/?', 'g')
  // const example = '/dash/cust/loc/inv/est'
  // const paths = pages.exec(example)
  // const paths = example.split('/')
  // console.log(`pathname: ${pathname}`)
  // console.log(paths?.length)
  // console.log(`sliced: ${paths?.slice(1)}`)
  // paths?.slice(1,).map((path, ii) => {
  // 	console.log(`index ${ii}: ${path}`)
  // })
  // const breadcrumb = paths?.slice(1,).length == 1
  // 	? '/breadcrumb'
  // 	: `/breadcrumb/${paths.slice(1,).}`

  // Could go off of /customers/... in path to infer useQuery(getCustomer ...)

  const textColorMode = useColorModeValue("cyan.500", "cyan.300")
  // const textColor = paths?.slice(1).length == 1 ? textColorMode : 'blue'
  const lightDarkTextColor = useColorModeValue("blackAlpha.600", "gray.300")

  const displayCrumb = (path: string) => {
    // Not working to render customer name
    if (displayname === "customers") {
      setDisplayname(customer?.displayname)
    } else {
      setDisplayname(path)
    }

    return displayname
  }

  return (
    <Box
      px={4}
      pb={1}
      bg={useColorModeValue("blackAlpha.100", "gray.700")}
      borderColor={useColorModeValue("gray.50", "blackAlpha.100")}
      borderWidth={1}
      borderRadius={8}
    >
      <Breadcrumb fontWeight="black" fontStyle="italic">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" textColor={lightDarkTextColor}>
            dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths?.slice(1).length >= 1 &&
          paths?.slice(1).map((path, ii) => (
            <BreadcrumbItem key={ii}>
              <BreadcrumbLink
                href={`/${paths?.slice(1, ii + 2).join("/")}`}
                textColor={ii + 1 == paths?.slice(1).length ? textColorMode : lightDarkTextColor}
                fontSize={ii + 1 == paths?.slice(1).length ? "xl" : "md"}
              >
                {/* {displayCrumb(path)} */}
                {ii + 1 == paths?.slice(1).length ? displayname : path}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
    </Box>
  )
}

export default HeaderCrumbs
