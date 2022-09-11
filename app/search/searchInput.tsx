import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { ChangeEventHandler, ComponentPropsWithoutRef, useCallback, useEffect, useMemo } from "react"
import { FaSearch } from "react-icons/fa"
import debounce from 'lodash/debounce'

type SearchInputProps = {
	setQuery: (q: string) => void
	props?: ComponentPropsWithoutRef<typeof Input>
}

const SearchInput = ({ setQuery, ...props }: SearchInputProps) => {
	const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
		({ target }) => {
			setQuery(target.value)
		},
		[setQuery]
	)

	const debouncedChangeHandler = useMemo(
		() => debounce(changeHandler, 300),
		[changeHandler]
	)

	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel()
		}
	}, [debouncedChangeHandler])

	return (
		<InputGroup size='lg'>
			<InputLeftElement pointerEvents='none'>
				<Icon as={FaSearch} color='gray.500' />
			</InputLeftElement>
			<Input
				onChange={debouncedChangeHandler}
				placeholder='Search...'
				variant='filled'
				{...props}
			/>
		</InputGroup>
	)
}

export default SearchInput
