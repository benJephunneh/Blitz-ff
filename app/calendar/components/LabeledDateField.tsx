import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react"
import getFieldErrorMessage from "app/core/components/forms/helpers/getFieldErrorMessage"
import { addDays, format } from "date-fns"
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef, useState } from "react"
import { Calendar } from "react-calendar"
import { useField, UseFieldConfig } from "react-final-form"

interface LabeledDateFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  initialDate?: Date
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<Date>
}

export const LabeledDateField = forwardRef<HTMLInputElement, LabeledDateFieldProps>(
  ({ name, label, initialDate, outerProps, labelProps, fieldProps, ...props }, ref) => {
    const { input, meta } = useField(name)
    const error = getFieldErrorMessage(meta)
    const [value, onChange] = useState(initialDate || addDays(new Date().setHours(9, 0, 0, 0), 1))
    // const [value, onChange] = useState((d: Date) => {
    //   const nd = new Date(d.getMonth(d.setHours(9)))
    //   return nd
    // })

    // const normalizedError = Array.isArray(error)
    //   ? error.join(', ')
    //   : error || submitError

    return (
      <FormControl {...outerProps}>
        {/* <FormLabel {...labelProps}>{label}</FormLabel> */}
        <Accordion allowToggle>
          <AccordionItem>
            <Heading>
              <AccordionButton>
                <Stat>
                  <StatLabel>{label}</StatLabel>
                  <Text as={StatNumber}>{format(value, "HHmm EEE, do LLLL")}</Text>
                </Stat>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel>
              <Calendar defaultValue={value} onChange={onChange} value={value} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {/* <Text
          disabled={meta.submitting}
          ref={ref}
          defaultValue={value.toString()}
          onChange={onChange}
          {...props}
        /> */}
      </FormControl>
    )
  }
)
