import React, { Suspense } from "react"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { withBlitz } from "app/blitz-client"
import { ChakraProvider } from "@chakra-ui/react"
import LayoutLoader from "app/core/components/LayoutLoader"
import PageLoader from "app/core/components/PageLoader"

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
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(
          <Suspense fallback={<PageLoader />}>
            <Component {...pageProps} />
          </Suspense>
        )}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
