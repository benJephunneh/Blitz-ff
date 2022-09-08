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
import customerContext from "../contexts/customerContext"

type CustomerDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const CustomerDrawer = ({ isOpen, onClose }: CustomerDrawerProps) => {
  const { customer } = useContext(customerContext)

  return (
    <Drawer placement="right" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay backdropFilter="blur(2xp)" />
      <DrawerContent>
        <DrawerCloseButton zIndex={2} />
        <DrawerHeader borderBottomWidth={1}>
          {customer.firstname} {customer.lastname}
        </DrawerHeader>
        <DrawerBody p={0}>
          <Spinner />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CustomerDrawer
