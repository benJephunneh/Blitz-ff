import { Button } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useForm } from "usetheform"

type SubmitButtonProps = {
  children?: ReactNode
}

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { isValid, pristine } = useForm()

  return (
    <Button disabled={!isValid || pristine} type="submit" {...props}>
      {children ?? "Submit"}
    </Button>
  )
}

export default SubmitButton
