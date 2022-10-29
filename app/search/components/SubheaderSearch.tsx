import { Routes } from "@blitzjs/next"
import { Button, HStack, Icon, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import Card from "app/core/components/Card"
import headerContext from "app/core/components/header/headerContext"
import LinkCard from "app/core/components/LinkCard"
import Link from "next/link"
import { useContext, useState } from "react"
import { FcSearch } from "react-icons/fc"

const SubheaderSearch = () => {
  const { openSearch } = useContext(headerContext) // When the input box is working in the subheader, this will run the search.

  return (
    // <SearchInput search={search} />
    // <LinkBox>
    //   <Link href={Routes.SearchPage()} passHref>
    //     <LinkOverlay>
    //       <HStack>
    //         <Icon as={FcSearch} mr={2} />
    //         <Text noOfLines={1} fontWeight="semibold" textOverflow="ellipsis">
    //           Go to search
    //         </Text>
    //       </HStack>
    //     </LinkOverlay>
    //   </Link>
    // </LinkBox>
    <>
      <Button
        onClick={openSearch}
        size="sm"
        backdropFilter="auto"
        backdropBlur="1px"
        bg="transparent"
      >
        Search
      </Button>
    </>
  )
}

export default SubheaderSearch
