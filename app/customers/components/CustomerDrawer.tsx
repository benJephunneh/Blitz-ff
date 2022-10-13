import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from "@chakra-ui/react"
import headerContext from "app/core/components/header/headerContext"
import { useContext } from "react"
import customerContext from "../contexts/customerContext"

type CustomerDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const CustomerDrawer = ({ isOpen, onClose }: CustomerDrawerProps) => {
  const { customer } = useContext(headerContext)
  // console.log(`Customer's firstname from CustomerDrawer: ${customer?.firstname}`)

  return (
    <Drawer placement="right" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay backdropFilter="blur(2xp)" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth={1}>
          {/* {customer.firstname} {customer.lastname} */}
          asdf
        </DrawerHeader>
        <DrawerBody p={0}>
          <Spinner />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default CustomerDrawer
