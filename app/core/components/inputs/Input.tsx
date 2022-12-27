import { HTMLInputTypeAttribute } from "react"

type InputProps = {
  // props?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  type?: HTMLInputTypeAttribute
  divProps?: string
  span?: string
  inputProps?: string
  name: string
  placeholder?: string
}

const Input = ({
  type = "text",
  divProps,
  span,
  inputProps,
  name,
  placeholder = "Input...",
}: InputProps) => {
  return (
    // Ex: [http://|<user inputs text, here>]
    // <Input span='http://' placeholder='Input text' />

    <div className={"flex rounded-md shadow-sm " + divProps}>
      <span
        className={
          "inline-flex items-center rounded-1-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 " +
          span
            ? ""
            : "hidden"
        }
      >
        {span}
      </span>
      <input
        type={type}
        name={name}
        id={name}
        className={
          "px-3 py-2 h-12 border-1 border-solid border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded te-base leading-snug shadow-md outline-none focus:outline-none w-full font-normal " +
          inputProps
        }
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
