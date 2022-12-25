import { BlitzPage, Routes } from "@blitzjs/next"

const JobsPage: BlitzPage = () => {
  return <></>
}

JobsPage.authenticate = { redirectTo: Routes.Home() }
// JobsPage.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default JobsPage
