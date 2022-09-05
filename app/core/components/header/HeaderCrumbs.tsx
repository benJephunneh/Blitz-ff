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
  console.log(`sliced: ${paths?.slice(1)}`)
  // paths?.slice(1,).map((path, ii) => {
  // 	console.log(`index ${ii}: ${path}`)
  // })
  // const breadcrumb = paths?.slice(1,).length == 1
  // 	? '/breadcrumb'
  // 	: `/breadcrumb/${paths.slice(1,).}`

  // Could go off of /customers/... in path to infer useQuery(getCustomer ...)

  let textColor = paths?.slice(1).length == 1 ? "#009a4c" : "black"

  return (
    <Box
      bg={useColorModeValue("blackAlpha.100", "gray.600")}
      px={4}
      pb={1}
      borderWidth={1}
      borderRadius={4}
    >
      <Breadcrumb fontWeight="black" fontStyle="italic">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {paths?.slice(1).length >= 1 &&
          paths?.slice(1).map((path, ii) => (
            <BreadcrumbItem key={ii}>
              <BreadcrumbLink
                href={`/${paths?.slice(1, ii + 2).join("/")}`}
                textColor={ii + 1 == paths?.slice(1).length ? "#009a4c" : "black"}
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
