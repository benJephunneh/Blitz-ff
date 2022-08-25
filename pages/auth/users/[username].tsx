import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import { GridItem, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Link from "next/link"

const ProfilePage: BlitzPage = () => {
  const username = useParam("username", "string")
  const currentUser = useCurrentUser()

  return (
    <VStack spacing={10} alignItems="flex-start" justify="left">
      <Heading size="lg" alignItems="center">
        {username}
      </Heading>

      <SimpleGrid row={1} columnGap={3}>
        <GridItem>
          <Link href={`mailto:${currentUser!.email}`} passHref>
            <a>{`${currentUser!.email}`}</a>
          </Link>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

ProfilePage.authenticate = { redirectTo: Routes.Home() }

export default ProfilePage
