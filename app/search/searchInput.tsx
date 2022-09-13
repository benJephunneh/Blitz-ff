import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import { FcSearch } from "react-icons/fc"
import debounce from "lodash/debounce"

type SearchInputProps = {
  setQuery: (val: string) => void
  props?: ComponentPropsWithoutRef<typeof Input>
}

const SearchInput = ({ setQuery, ...props }: SearchInputProps) => {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setQuery(target.value)
    },
    [setQuery]
  )

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler])

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <Icon as={FcSearch} />
      </InputLeftElement>
      <Input
        onChange={debouncedChangeHandler}
        placeholder="Search..."
        variant="filled"
        {...props}
      />
    </InputGroup>
  )
}

export default SearchInput
