import { Routes, useParams } from "@blitzjs/next"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

const HeaderCrumbs = () => {
  const pathname = window.location.pathname
  const paths = pathname.split("/")
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

  const textColorMode = useColorModeValue("cyan.500", "blue.200")
  // const textColor = paths?.slice(1).length == 1 ? textColorMode : 'blue'
  const lightDarkTextColor = useColorModeValue("blackAlpha.600", "gray.300")

  return (
    <Box
      bg={useColorModeValue("blackAlpha.100", "blackAlpha.400")}
      borderColor={useColorModeValue("gray.50", "blackAlpha.50")}
      px={4}
      pb={1}
      borderWidth={2}
      borderRadius={8}
    >
      <Breadcrumb fontWeight="black" fontStyle="italic">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/dashboard"
            textColor={useColorModeValue("blackAlpha.600", "gray.300")}
          >
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
                {path}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
    </Box>
  )
}

export default HeaderCrumbs
