import { BlitzPage, Routes } from "@blitzjs/next"

const JobPage: BlitzPage = () => {
  return <></>
}

JobPage.authenticate = { redirectTo: Routes.Home() }
// JobPage.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default JobPage
