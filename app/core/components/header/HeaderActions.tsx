import { HStack, Icon, useColorMode } from "@chakra-ui/react"
import { FaHamburger } from "react-icons/fa"
import { GiMoon, GiSun, GiWoodenClogs } from "react-icons/gi"
import HeaderIconButton from "./HeaderIconButton"

type HeaderActionsProps = {
  toggleDrawer: () => void
}

const HeaderActions = ({ toggleDrawer }: HeaderActionsProps) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack spacing={1}>
      <HeaderIconButton
        label="Open menu"
        onClick={toggleDrawer}
        icon={<Icon as={FaHamburger} size={5} />}
      />
      <HeaderIconButton
        label={colorMode === "dark" ? "Clogged" : "Unclogged"}
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? GiWoodenClogs : GiSun} size={5} />}
      />
    </HStack>
  )
}

export default HeaderActions
