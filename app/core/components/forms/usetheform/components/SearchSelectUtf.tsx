import { useQuery } from "@blitzjs/rpc"
import { useState } from "react"
import CreateableSelect from "react-select/creatable"

type SearchSelectUtfProps = {
  initialQuery?: string
}

interface Option {
  readonly label: string
  readonly value: string
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
})

const defaultOptions = [createOption("One"), createOption("Two"), createOption("Three")]

const SearchSelectUtf = ({ initialQuery }: SearchSelectUtfProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState<Option>()

  const [query, setQuery] = useState(initialQuery)
  // const [items, { isLoading }] = useQuery(
  //   findLine
  // )

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue)
    setOptions((p) => [...p, newOption])
    // setValue(newOption)
  }

  console.log("options", { ...options })

  return (
    <CreateableSelect
      autoFocus
      isClearable
      isMulti
      isDisabled={isLoading}
      onChange={(o) => {
        console.log("o", o)
        setOptions((p) => [...p, ...o])
      }}
      onCreateOption={handleCreate}
      options={options}
      onInputChange={console.log}
      // value={value}
    />
  )
}

export default SearchSelectUtf
