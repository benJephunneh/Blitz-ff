import { BlitzLayout } from "@blitzjs/next"
import { Box } from "@chakra-ui/react"
import { useState } from "react"
import Header from "../components/header/Header"
import PageTitle from "../components/PageTitle"

type HeaderLayoutProps = {
  title?: string
  description?: string
  subheader?: JSX.Element
}

const HeaderLayout: BlitzLayout<HeaderLayoutProps> = ({
  title = "ABST",
  description,
  subheader = null,
  children,
}) => {
  return (
    <>
      <PageTitle title={title} />

      <Header />

      {subheader}

      <Box flex="1 1 auto" w="100vw" overflowX="auto" overflowY="hidden">
        {children}
      </Box>
    </>
  )
}

export default HeaderLayout
