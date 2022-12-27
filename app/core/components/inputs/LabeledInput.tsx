import { ComponentPropsWithoutRef, FC, PropsWithoutRef } from "react"

type LabeledInputProps = {
  // props?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  divProps?: string
  labelProps?: string
  label: string
  inputProps?: string
  name: string
  placeholder?: string
}

const LabeledInput = ({
  divProps,
  labelProps,
  label,
  inputProps,
  name,
  placeholder,
}: LabeledInputProps) => {
  return (
    <div className={divProps}>
      <label className={labelProps}>{label}</label>
      <input type="text" name={name} id={name} className={inputProps} placeholder={placeholder} />
    </div>
  )
}

export default LabeledInput
