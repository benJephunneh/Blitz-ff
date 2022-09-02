import { Routes } from "@blitzjs/next"
import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FcExpand, FcGlobe } from "react-icons/fc"
import createLocation from "../mutations/createLocation"

type LocationProp = { location: PromiseReturnType<typeof createLocation> }

const MapLinkIcon = ({ location }: LocationProp) => {
  const router = useRouter()

  return (
    <Button
      aria-label="Link to Google map"
      size="sm"
      variant="link"
      leftIcon={<FcGlobe />}
      fontWeight="light"
    >
      <a
        href={`http://maps.google.com/maps?q=${location.house} ${location.street} ${location.city},${location.state}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        map
      </a>
    </Button>
  )
}

const ParcelIdTag = ({ parcelId }: { parcelId: string | null }) => {
  const router = useRouter()

  if (!parcelId) {
    return <TagLabel>asdf</TagLabel>
  }
}

type LocationListItemProps = {
  location: PromiseReturnType<typeof createLocation>
  children: ReactNode
}

const LocationMenuListItem = ({ location, children }: LocationListItemProps) => {
  const router = useRouter()
  const [hoverState, setHoverState] = useState(false)
  const hoverColor = useColorModeValue("gray.100", "white")

  return (
    <>
      <MenuItem>
        <Link
          href={Routes.ShowLocationPage({
            customerId: location.customerId,
            locationId: location.id,
          })}
          passHref
        >
          <Text
            as="a"
            onMouseOver={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            py={1}
            px={2}
            w="full"
            fontWeight="semibold"
            textColor="blackAlpha.800"
            justifyContent="left"
            bg={hoverState ? hoverColor : "white"}
          >
            {children}
          </Text>
        </Link>
      </MenuItem>
      <MenuItem>
        <ButtonGroup isAttached>
          <Menu gutter={0} isLazy>
            <MenuButton
              as={Button}
              rightIcon={<FcExpand size={10} />}
              onMouseOver={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              bg={hoverState ? hoverColor : "white"}
              fontWeight="hairline"
              borderRadius={0}
              px={2}
              _hover={{ bg: "white", borderBottom: "1px solid orange" }}
              _active={{ borderBottom: "1px solid orange" }}
            >
              Jobs
            </MenuButton>
            <MenuList>{/* <JobList customerId={id} /> */}</MenuList>

            <Tooltip label="Add job">
              <IconButton
                onMouseOver={() => setHoverState(true)}
                onMouseLeave={() => setHoverState(false)}
                bg={hoverState ? hoverColor : "white"}
                color="cyan.400"
                aria-label="Add job"
                icon={<FaPlus size={10} />}
                borderRadius={0}
                px={0}
                variant="ghost"
                _hover={{ bg: "white" }}
              />
            </Tooltip>
          </Menu>
        </ButtonGroup>
        <Tag colorScheme="orange" ml={3}>
          {location.parcel ? (
            <TagLabel>
              <Link href={`https://beacon.schneidercorp.com/Search?q=${location.parcel}`} passHref>
                <Text as="a" fontSize="smaller" rel="noopener noreferrer" target="_blank">
                  Parcel ID: {location.parcel}
                </Text>
              </Link>
            </TagLabel>
          ) : (
            <TagLabel>
              <Link
                href={`https://beacon.schneidercorp.com/Search?q=${location.house} ${location.street}`}
                passHref
              >
                <Text as="a" fontSize="smaller" rel="noopener norefferer" target="_blank">
                  Find parcel ID
                </Text>
              </Link>
            </TagLabel>
          )}
        </Tag>
        <MapLinkIcon location={location} />
      </MenuItem>

      {/*
      <HStack spacing={4} ml={4}>
        <Link
          href={Routes.ShowLocationPage({
            customerId: location.customerId,
            locationId: location.id,
          })}
          passHref
        >
          {`${location.house} ${location.street}, ${location.city} ${location.zipcode}`}
        </Link>
      <Text>
        {location.house} {location.street}, {location.city} {location.zipcode}
      </Text>
        <Tag colorScheme="orange" ml={3}>
          {location.parcel ? (
            <TagLabel>
              <Link
                href={`https://qpublic.schneidercorp.com/Search?q=${location.parcel}`}
                passHref
                rel="noopener noreferrer"
                target="_blank"
              >
                <Text>Parcel ID: {location.parcel}</Text>
              </Link>
            </TagLabel>
          ) : (
            <TagLabel>
              <Link
                href={`https://qpublic.schneidercorp.com/Search?q=${location.house} ${location.street}`}
                passHref
                rel="noopener noreferrer"
                target="_blank"
              >
                <Text as="a">Find parcel ID</Text>
              </Link>
            </TagLabel>
          )}
        </Tag>
        <MapLinkIcon location={location} />
  */}
    </>
  )
}

const GadsdenLink = () => {}

export default LocationMenuListItem
