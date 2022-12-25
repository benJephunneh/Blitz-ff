import { BlitzPage, Routes } from "@blitzjs/next"

const Dashboard: BlitzPage = () => {
  return (
    <div>
      <p>See console for log.</p>
    </div>

    // # of customers
    // Unpaid invoices
    // Un-invoiced jobs

    // Actually, all this seems like dashboard material.
  )
}

Dashboard.authenticate = { redirectTo: Routes.Home() }
// Dashboard.getLayout = (page) => <HeaderLayout>{page}</HeaderLayout>

export default Dashboard
