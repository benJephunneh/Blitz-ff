import { BlitzLayout } from "@blitzjs/next"
import { useState } from "react"
import Header from "../components/header/Header"
import PageTitle from "../components/PageTitle"

type HeaderLayoutProps = {
  title?: string
  description?: string
}

const HeaderLayout: BlitzLayout<HeaderLayoutProps> = ({
  title = "ABST",
  description,
  children,
}) => {
  return (
    <>
      <PageTitle title={title} />

      <Header />

      {children}
    </>
  )
}

export default HeaderLayout
