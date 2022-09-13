import { ButtonProps, IconButton, IconButtonProps, Pseudos, Tooltip } from "@chakra-ui/react"
import { ReactElement } from "react"

type HeaderIconButtonProps = {
  label: string
  onClick: () => void
  icon: ReactElement
  props?: Partial<ButtonProps>
}

const HeaderIconButton = ({ label, onClick, icon, ...props }: HeaderIconButtonProps) => {
  return (
    <Tooltip label={label}>
      <IconButton
        variant="ghost"
        aria-label={label}
        onClick={onClick}
        icon={icon}
        {...props}
        _hover={{ bg: "transparent" }}
      />
    </Tooltip>
  )
}

export default HeaderIconButton
