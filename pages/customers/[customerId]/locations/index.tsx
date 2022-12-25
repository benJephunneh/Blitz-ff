import { BlitzPage, Routes } from "@blitzjs/next"

const LocationsPage: BlitzPage = () => {
  return <></>
}

LocationsPage.authenticate = { redirectTo: Routes.Home() }
// LocationsPage.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default LocationsPage
