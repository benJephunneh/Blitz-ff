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
import { useField, UseFieldConfig } from "react-final-form"

import DateTimeRangePicker from "@wojtekmaj/react-daterange-picker"
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css"

interface LabeledDateFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  initialDate?: Date
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<Date>
}

export const LabeledDateRangeField = forwardRef<HTMLInputElement, LabeledDateFieldProps>(
  ({ name, label, initialDate, outerProps, labelProps, fieldProps, ...props }, ref) => {
    const { input, meta } = useField(name)
    const error = getFieldErrorMessage(meta)
    const [value, onChange] = useState<string | Date>(
      initialDate || addDays(new Date().setHours(9, 0, 0, 0), 1)
    )
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
                  <Text as={StatNumber}>{format(value as Date, "HHmm EEE, do LLLL")}</Text>
                </Stat>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel>
              <DateTimeRangePicker
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                yearAriaLabel="Year"
                nativeInputAriaLabel="Date"
                onChange={onChange}
                value={value}
              />
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
