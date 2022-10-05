import { Routes } from "@blitzjs/next"
import {
  Button,
  ButtonGroup,
  forwardRef,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { MutationType } from "app/core/components/types/MutationType"
import LocationMenuList from "app/locations/components/LocationMenuList"
import LocationModalForm from "app/locations/components/LocationModalForm"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FcExpand } from "react-icons/fc"

type CustomerListItemProps = {
  customerId: number
  children: ReactNode
}

const CustomerListItem = ({ customerId, children }: CustomerListItemProps) => {
  const router = useRouter()
  const [creatingLocation, setCreatingLocation] = useState(false)
  const [hoverState, setHoverState] = useState(false)
  const hoverColor = useColorModeValue("gray.100", "white")

  return (
    <>
      <LocationModalForm
        customerId={customerId!}
        isOpen={creatingLocation}
        onClose={() => setCreatingLocation(false)}
        mutationType={"New" as MutationType}
        onSuccess={async (_location) => {
          setCreatingLocation(false)
          await router.push(
            Routes.ShowLocationPage({ customerId: customerId!, locationId: _location!.id })
          )
        }}
      />

      <GridItem area="name" rowSpan="auto" borderRadius={8}>
        <Link href={Routes.ShowCustomerPage({ customerId })} passHref>
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
              <LocationMenuList customerId={customerId} />
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
                onClick={() => setCreatingLocation(true)}
              />
            </Tooltip>
          </Menu>
        </ButtonGroup>
      </GridItem>
    </>
  )
}

export default CustomerListItem
