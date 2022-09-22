import { Routes } from "@blitzjs/next"
import { HStack, Icon, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import Card from "app/core/components/Card"
import LinkCard from "app/core/components/LinkCard"
import Link from "next/link"
import { useContext, useState } from "react"
import { FcSearch } from "react-icons/fc"
import dashboardContext from "./dashboardContext"

const DashboardSearch = () => {
  const { search } = useContext(dashboardContext)

  return (
    // <SearchInput search={search} />
    <LinkBox>
      <Link href={Routes.SearchPage()} passHref>
        <LinkOverlay>
          <HStack>
            <Icon as={FcSearch} mr={2} />
            <Text fontWeight="semibold">Go to search</Text>
          </HStack>
        </LinkOverlay>
      </Link>
    </LinkBox>
  )
}

export default DashboardSearch
