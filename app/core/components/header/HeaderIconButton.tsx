import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react"
import { ReactElement } from "react"

type HeaderIconButtonProps = {
  label: string
  onClick: () => void
  icon: ReactElement
  props?: Partial<IconButtonProps>
}

const HeaderIconButton = ({ label, onClick, icon, ...props }: HeaderIconButtonProps) => {
  return (
    <Tooltip label={label}>
      <IconButton variant="ghost" aria-label={label} onClick={onClick} icon={icon} {...props} />
    </Tooltip>
  )
}

export default HeaderIconButton
