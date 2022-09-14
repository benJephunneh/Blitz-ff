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

      <Box w="full" position="fixed" top={0} zIndex={3} alignItems="center">
        <Header>{subheader}</Header>

        {children}
      </Box>
    </>
  )
}

export default HeaderLayout
