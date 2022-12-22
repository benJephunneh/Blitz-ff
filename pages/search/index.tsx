import { BlitzPage, Routes } from "@blitzjs/next"

type SearchPageProps = {
  initialSearch?: string
}

const SearchPage: BlitzPage = ({ initialSearch = "" }: SearchPageProps) => {
  return (
    <div>
      <p>See console for log.</p>
    </div>
  )
}

SearchPage.authenticate = { redirectTo: Routes.Home() }
// SearchPage.getLayout = (page) => (
//   <HeaderLayout title="Search" description="Find a customer">
//     {page}
//   </HeaderLayout>
// )

export default SearchPage
