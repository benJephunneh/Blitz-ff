import Head from "next/head"
// import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Suspense } from "react"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <Suspense>
      <Head>
        <title>{title || "dev-ff"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </Suspense>
  )
}

export default Layout
