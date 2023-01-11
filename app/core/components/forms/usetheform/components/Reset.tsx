import { Button } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useForm } from "usetheform"

type ResetProps = {
  children?: ReactNode
}

const Reset = ({ children, ...props }: ResetProps) => {
  const { reset, pristine } = useForm()

  return (
    <Button disabled={pristine} type="button" onClick={reset} {...props}>
      {children ?? "Reset"}
    </Button>
  )
}

export default Reset
