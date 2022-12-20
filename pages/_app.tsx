import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { withBlitz } from "app/blitz-client"
import Router from "next/router"
import PageChange from "app/core/PageChange"
import Head from "next/head"

import "app/core/styles/index.css"
import "app/core/styles/tailwind.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

let container: HTMLElement | null = null
let root
Router.events.on("routeChangeStart", (url: string) => {
  console.log(`Loading ${url}`)
  if (!container) {
    container = document.getElementById("page-transition")
    root = createRoot(container)
    document.body.classList.add("body-page-transition")
    root.render(<PageChange path={url} />, document.getElementById("page-transition"))
  }
})
Router.events.on("routeChangeComplete", () => {
  root.unmount(document.getElementById("page-transition"))
  document.body.classList.remove("body-page-transition")
})
Router.events.on("routeChangeError", () => {
  root.unmount(document.getElementById("page-transition"))
  document.body.classList.remove("body-page-transition")
})

import "app/core/styles/index.css"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
