import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import debounce from "lodash/debounce"

type SearchInputProps = {
  search: (q: string) => void
  // props?: ComponentPropsWithoutRef<typeof Input>
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ search, ...props }, ref) => {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      search(target.value)
    },
    [search]
  )

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler])

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

  return <input onChange={debouncedChangeHandler} placeholder="Search..." ref={ref} {...props} />
})

export default SearchInput
