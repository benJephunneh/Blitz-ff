type LinkerProps = {
  item: string[]
  isDisabled?: boolean
}

function linker({ item, isDisabled = true }: LinkerProps) {
  // const name = `${item[0]?.toUpperCase()} ${item.slice(1)}`
  // const href = `/${item.toLowerCase()}`

  item.map((l) => {
    return {
      name: `${l[0]?.toUpperCase()} ${l.slice(1)}`,
      href: `/${l.toLowerCase()}`,
      isDisabled: isDisabled,
    }
  })
  // return {
  //   name: name,
  //   href: href,
  //   isDisabled: isDisabled,
  // }
}

export default linker
