import { BlitzPage, Routes } from "@blitzjs/next"

const CustomersPage: BlitzPage = () => {
  // Search from header
  return (
    <div>
      <p>See console for log.</p>
    </div>
  )
}

CustomersPage.authenticate = { redirectTo: Routes.Home() }
// CustomersPage.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default CustomersPage
