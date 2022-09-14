import { Routes } from "@blitzjs/next"
import { Heading, HStack, LinkOverlay, Stack, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react"
import { Customer } from "@prisma/client"
import LinkCard from "app/core/components/LinkCard"
import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { FaPhone } from "react-icons/fa"
import { GiExplosiveMaterials } from "react-icons/gi"

type CustomerCardProps = {
  customer: Pick<Customer, "id" | "firstname" | "lastname" | "email" | "phone">
  actions?: JSX.Element
  props?: ComponentPropsWithoutRef<typeof LinkCard>
}

const CustomerCard = ({ customer, actions, ...props }: CustomerCardProps) => {
  const route = Routes.ShowCustomerPage

  return (
    <LinkCard actions={actions} {...props}>
      <Stack align="center" spacing={5} py={1}>
        <Stack maxW="full" px={8} align="center" spacing={2}>
          <HStack maxW="full">
            {customer.id}
            <Link href={route({ customerId: customer.id })} passHref>
              <LinkOverlay>
                <Heading size="sm">
                  {customer.firstname} {customer.lastname}
                </Heading>
              </LinkOverlay>
            </Link>
          </HStack>
        </Stack>

        <HStack>
          <Tag size="sm">
            <TagLeftIcon as={FaPhone} />
            <TagLabel>{customer.phone}</TagLabel>
          </Tag>
          <Tag size="sm">
            <TagLeftIcon as={GiExplosiveMaterials} />
            <TagLabel>{customer.email}</TagLabel>
          </Tag>
        </HStack>
      </Stack>
    </LinkCard>
  )
}

export default CustomerCard
