import { Icon, Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react"
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
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none">
        <Icon as={FcSearch} />
      </InputLeftElement>
      <Input
        onChange={debouncedChangeHandler}
        placeholder="Search..."
        variant="filled"
        textColor={useColorModeValue("black", "black")}
        borderRadius={6}
        bg={useColorModeValue("gray.200", "gray.300")}
        _hover={{ bg: useColorModeValue("gray.100", "gray.200") }}
        _active={{ bg: useColorModeValue("gray.100", "gray.200") }}
        _focus={{ bg: "white" }}
        _placeholder={{ textColor: "blackAlpha.600" }}
        {...props}
      />
    </InputGroup>
  )
}

export default SearchInput
