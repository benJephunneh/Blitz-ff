import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

const HeaderCrumbs = () => {
  const pathname = window.location.pathname
  // Parse pathname (regex) to array, then map to BreadcrumItems

  return (
    <Breadcrumb fontWeight="black" fontStyle="italic">
      <BreadcrumbItem>
        <BreadcrumbLink href="" />
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default HeaderCrumbs
