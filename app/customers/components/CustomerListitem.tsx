import { Routes } from "@blitzjs/next"
import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { LocationList } from "pages/customers/[customerId]"
import { ReactNode, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FcPlus } from "react-icons/fc"

type CustomerListItemProps = {
  id: number
  children: ReactNode
}

const CustomerListItem = ({ id, children }: CustomerListItemProps) => {
  const router = useRouter()
  const [hoverState, setHoverState] = useState(false)
  const hoverColor = useColorModeValue("gray.100", "white")
  console.log(`id: ${id}`)
  return (
    <>
      <GridItem area="name" rowSpan="auto">
        <Link href={Routes.ShowCustomerPage({ customerId: id })} passHref>
          <Button
            onMouseOver={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            py={1}
            px={2}
            w="full"
            borderRadius={0}
            variant="ghost"
            fontWeight="semibold"
            textColor="blackAlpha.800"
            justifyContent="left"
            bg={hoverState ? hoverColor : "white"}
            _hover={{ bg: "white" }}
          >
            {children}
          </Button>
        </Link>
      </GridItem>
      <GridItem area="locations" rowSpan="auto">
        <ButtonGroup isAttached>
          <Menu>
            <MenuButton
              as={Button}
              onMouseOver={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              bg={hoverState ? hoverColor : "white"}
              fontWeight="hairline"
              fontSize="lg"
              borderRadius={0}
              px={2}
              _hover={{ bg: "white", borderBottom: "1px solid orange" }}
              _active={{ borderBottom: "1px solid orange" }}
            >
              {/* <MenuList>
                locations.map((location) => (
                  list primary, first
                  <MenuItem>{location.house} etc.</MenuItem>
              ))}
                */}
              Locations
            </MenuButton>
            <MenuList>
              <LocationList customerId={id} />
            </MenuList>

            <IconButton
              onMouseOver={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              bg={hoverState ? hoverColor : "white"}
              color="cyan.400"
              aria-label="Add location"
              icon={<FaPlus size={10} />}
              borderRadius={0}
              px={0}
              variant="ghost"
              _hover={{ bg: "white" }}
            />
          </Menu>
        </ButtonGroup>
      </GridItem>
    </>
  )
}

export default CustomerListItem
