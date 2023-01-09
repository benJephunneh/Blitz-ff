import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { useField } from "usetheform"

interface SwitchUtfProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  name: string
  label?: string
  onChange?: () => void
}

const SwitchUtf = forwardRef<HTMLInputElement, SwitchUtfProps>(
  ({ name, label, onChange, ...props }, ref) => {
    const { onChange: trash, ...fieldProps } = useField({
      type: "checkbox",
      name,
    })
    // console.log("fieldprops", { ...fieldProps })
    // console.log({ ...props })
    // console.log({ hasError })
    // console.log({ error })

    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <Switch onChange={onChange} {...props} {...fieldProps} ref={ref} />
      </FormControl>
    )
  }
)

export default SwitchUtf
