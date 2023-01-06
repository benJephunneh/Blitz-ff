import { Button } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useForm } from "usetheform"

type SubmitProps = {
  children?: ReactNode
}

const Submit = ({ children, ...props }: SubmitProps) => {
  const { isValid, pristine } = useForm()

  return (
    <Button disabled={!isValid || pristine} type="submit" {...props}>
      {children ?? "Submit"}
    </Button>
  )
}

export default Submit
