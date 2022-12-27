import { HTMLInputTypeAttribute } from "react"
import Input from "./Input"

type SearchProps = {
  type?: HTMLInputTypeAttribute
  divProps?: string
  span?: string
  icon?: string
  inputProps?: string
  name: string
  placeholder?: string
}

const Search = ({
  type = "text",
  divProps,
  span,
  icon,
  inputProps,
  name,
  placeholder = "Input...",
}: SearchProps) => {
  return (
    <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
      <Input icon={icon} placeholder={placeholder} name={name} />
    </form>
  )
}

export default Search
