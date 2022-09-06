import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Navigation from "./Navigation"

type HamburgerDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const HamburgerDrawer = ({ isOpen, onClose }: HamburgerDrawerProps) => {
  const router = useRouter()
  const bg = useColorModeValue("white", "gray.800")

  useEffect(() => {
    onClose()
  }, [router.pathname]) // eslint-disable-line

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay backdropFilter="blur(2px)" />
      <DrawerContent bg={bg} py={6}>
        <DrawerCloseButton zIndex={2} />
        <DrawerBody>
          <Navigation />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default HamburgerDrawer
