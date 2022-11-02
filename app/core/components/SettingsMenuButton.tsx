import { Box, Icon, IconButton, Menu, MenuButton } from "@chakra-ui/react"
import { ReactNode } from "react"
import { FaChevronDown, FaCog } from "react-icons/fa"

type SettingsMenuButtonProps = {
  children?: ReactNode
}

const SettingsMenuButton = ({ children }: SettingsMenuButtonProps) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Settings actions"
          size="sm"
          variant="outline"
          px={2}
          rightIcon={<Icon as={FaChevronDown} pr={1} mr={1} />}
          icon={<Icon as={FaCog} color="gray.500" w={5} h={5} pl={1} ml={1} />}
        />

        {children}
      </Menu>
    </Box>
  )
}

export default SettingsMenuButton
