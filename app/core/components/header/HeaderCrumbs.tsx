import { Routes } from "@blitzjs/next"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react"

const HeaderCrumbs = () => {
  const pathname = window.location.pathname
  const paths = pathname.split("/")
  // Parse pathname (regex) to array, then map to BreadcrumItems
  // const pages = new RegExp('^\/?(\w*)\/?', 'g')
  // const example = '/dash/cust/loc/inv/est'
  // const paths = pages.exec(example)
  // const paths = example.split('/')
  // console.log(paths?.length)
  // paths?.slice(1,).map((path, ii) => {
  //   console.log(`index ${ii}: ${path}`)
  // })

  // Could go off of /customers/... in path to infer useQuery(getCustomer ...)

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
          <BreadcrumbLink href={Routes.Dashboard().pathname}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {paths?.slice(1).map((path, ii) =>
          ii != paths.length - 2 ? (
            <BreadcrumbItem key={ii}>
              <BreadcrumbLink href={`/${paths?.slice(1, ii + 2).join("/")}`}>{path}</BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={ii} fontSize="xl" textColor="#009a4c">
              <BreadcrumbLink href="">{path}</BreadcrumbLink>
            </BreadcrumbItem>
          )
        )}
      </Breadcrumb>
    </Box>
  )
}

export default HeaderCrumbs
