import { useSession } from "@blitzjs/auth"
import { HStack, Icon, useColorMode } from "@chakra-ui/react"
import { FaHamburger } from "react-icons/fa"
import { GiMoon, GiSun, GiWoodenClogs } from "react-icons/gi"
import HeaderIconButton from "./HeaderIconButton"

type HeaderActionsProps = {
  toggleDrawer: () => void
}

const HeaderActions = ({ toggleDrawer }: HeaderActionsProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const session = useSession({ suspense: false })
  const isLoggedIn = !!session.userId

  return (
    <HStack spacing={1}>
      {isLoggedIn && (
        <HeaderIconButton
          label="Open menu"
          onClick={toggleDrawer}
          icon={<Icon as={FaHamburger} size={5} />}
        />
      )}
      <HeaderIconButton
        label={colorMode === "dark" ? "Bright" : "Dark"}
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? GiSun : GiMoon} size={5} />}
      />
    </HStack>
  )
}

export default HeaderActions
