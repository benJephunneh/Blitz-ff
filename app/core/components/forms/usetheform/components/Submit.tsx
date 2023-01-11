import { Button } from "@chakra-ui/react"
import { ButtonHTMLAttributes, HTMLInputTypeAttribute, ReactNode } from "react"
import { useForm } from "usetheform"

type SubmitProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  children?: ReactNode
  onClick?: () => void
}

const Submit = ({ type = "submit", children, onClick, ...props }: SubmitProps) => {
  const { isValid, pristine } = useForm()

  return (
    <Button
      disabled={!isValid || pristine}
      type={type}
      onClick={onClick}
      variant="outline"
      border="1px solid"
      borderColor="blue.200"
      size="sm"
      {...props}
    >
      {children ?? "Submit"}
    </Button>
  )
}

export default Submit
