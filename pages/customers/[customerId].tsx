import { BlitzPage, Routes } from "@blitzjs/next"

const CustomerPage: BlitzPage = () => {
  return (
    <div>
      <p>See console for log.</p>
    </div>
  )
}

CustomerPage.authenticate = { redirectTo: Routes.Home() }
// CustomerPage.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default CustomerPage
