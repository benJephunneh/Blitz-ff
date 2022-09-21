import { Skeleton } from "@chakra-ui/react"
import Header from "./header/Header"

const LayoutLoader = () => {
  return (
    <>
      <Header />
      <Skeleton position="fixed" top={0} left={0} right={0} bottom={0} zIndex={1} />
    </>
  )
}

export default LayoutLoader
