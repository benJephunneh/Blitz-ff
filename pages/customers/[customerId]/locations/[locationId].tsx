import { BlitzPage, Routes } from "@blitzjs/next"

const LocationPage: BlitzPage = () => {
  return <></>
}

LocationPage.authenticate = { redirectTo: Routes.Home() }
// LocationPage.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default LocationPage
