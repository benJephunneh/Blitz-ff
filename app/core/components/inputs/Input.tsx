import { HTMLInputTypeAttribute } from "react"

type InputProps = {
  // props?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  type?: HTMLInputTypeAttribute
  divProps?: string
  span?: string
  icon?: string
  inputProps?: string
  name: string
  placeholder?: string
}

const Input = ({
  type = "text",
  divProps,
  span,
  icon,
  inputProps,
  name,
  placeholder = "Input...",
}: InputProps) => {
  return (
    // Ex: [http://|<user inputs text, here>]
    // <Input span='http://' placeholder='Input text' />

    <div className={"relative flex w-full flex-wrap items-stretch " + divProps}>
      <span
        className={
          "z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3 text-slate-300 " +
          (span || icon)
            ? ""
            : "hidden"
        }
      >
        {span}
        {icon && <i className={icon} />}
      </span>
      <input
        type={type}
        name={name}
        id={name}
        className={
          "px-3 py-0 border-1 border-solid border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded te-base leading-snug shadow-md outline-none focus:outline-none w-full font-normal " +
          inputProps
        }
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
