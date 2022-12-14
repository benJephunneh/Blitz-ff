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
import jobContext from "../contexts/jobContext"

type JobDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const JobDrawer = ({ isOpen, onClose }: JobDrawerProps) => {
  const { job } = useContext(headerContext)

  return (
    <Drawer placement="right" size="xl" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay backdropFilter="blur(2xp)" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth={1}>{job?.title}</DrawerHeader>
        <DrawerBody p={0}>
          <Spinner />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default JobDrawer
