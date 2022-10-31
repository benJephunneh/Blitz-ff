import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from "@chakra-ui/react"
import { useContext } from "react"
import locationContext from "../contexts/locationContext"

type LocationDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const LocationDrawer = ({ isOpen, onClose }: LocationDrawerProps) => {
  const { location } = useContext(locationContext)

  return (
    <Drawer placement="right" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay backdropFilter="blur(2xp)" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth={1}>
          {location?.house} {location?.street}, {location?.city} {location?.zipcode}
        </DrawerHeader>
        <DrawerBody p={0}>
          <Spinner />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default LocationDrawer
