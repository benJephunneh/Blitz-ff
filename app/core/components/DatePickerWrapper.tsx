import { ComponentPropsWithoutRef, FC } from "react"
import DatePicker from "react-datepicker"
import { Field, FieldInputProps } from "react-final-form"

type DatePickerWrapperProps = {
  input: ComponentPropsWithoutRef<typeof Field>
  label: string
  minDate: Date
  maxDate: Date
}

const DatePickerWrapper = ({ input, label, minDate, maxDate }: DatePickerWrapperProps) => {
  const { value, onBlur, onChange, onFocus } = input
  return (
    <>
      <label>{label}</label>
      <DatePicker
        showPopperArrow={false}
        showMonthDropdown
        dropdownMode="select"
        selected={value}
        minDate={minDate}
        maxDate={maxDate}
        todayButton="Today"
        onChange={(value) => {
          onChange(value)
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
      />
    </>
  )
}

export default DatePickerWrapper
