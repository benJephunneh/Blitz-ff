import { Routes } from "@blitzjs/next"
import { Button, ButtonGroup, GridItem } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

type CustomerListItemProps = {
  key: number
  children: ReactNode
}

const CustomerListItem = ({ key, children }: CustomerListItemProps) => {
  const router = useRouter()
  return (
    <Link
      key={key}
      href={Routes.ShowCustomerPage({ customerId: key })}
      passHref
      as={`/customers/${key!}`}
    >
      <GridItem
        as="a"
        py={1}
        px={2}
        area="name"
        rowSpan="auto"
        fontWeight="semibold"
        textColor="blackAlpha.800"
        _hover={{ bg: "gray.100" }}
      >
        {children}
      </GridItem>
    </Link>
  )
}

export default CustomerListItem
