import { Routes } from "@blitzjs/next"
import { usePaginatedQuery } from "@blitzjs/rpc"
import {
  Button,
  ButtonGroup,
  Flex,
  forwardRef,
  Grid,
  GridItem as ListItem,
  HStack,
  IconButton,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import LocationList from "app/locations/components/LocationList"
import Link from "next/link"
import { useRouter } from "next/router"
import { createRef } from "react"
import { ReactNode, useState } from "react"
import { FaChevronDown, FaPlus } from "react-icons/fa"
import { FcExpand, FcNext, FcPlus, FcPrevious } from "react-icons/fc"
import { TbChevronDownRight } from "react-icons/tb"
import { VscChevronDown } from "react-icons/vsc"
import getCustomers from "../queries/getCustomers"

type CustomerMenuListItemProps = {
  id: number
  children: ReactNode
}

const CustomerMenuListItem = forwardRef(({ id, children }: CustomerMenuListItemProps, ref) => {
  const [hoverState, setHoverState] = useState(false)
  const hoverColor = useColorModeValue("gray.100", "white")
  const nextRef = createRef()

  return (
    <>
      <ListItem ref={ref} area="name" rowSpan="auto" borderRadius={8}>
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
      </ListItem>
      <ListItem area="locations" rowSpan="auto">
        <ButtonGroup isAttached>
          <Menu gutter={0} isLazy>
            <MenuButton
              as={Button}
              rightIcon={<FcExpand size={10} />}
              onMouseOver={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              bg={hoverState ? hoverColor : "white"}
              fontSize="md"
              fontWeight="light"
              borderRadius={0}
              px={2}
              _hover={{ bg: "white", borderBottom: "1px solid orange" }}
              _active={{ borderBottom: "1px solid orange" }}
            >
              Locations
            </MenuButton>
            <MenuList>
              <LocationList customerId={id} />
            </MenuList>

            <Tooltip label="Add location">
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
            </Tooltip>
          </Menu>
        </ButtonGroup>
      </ListItem>
    </>
  )
})

export default CustomerMenuListItem
