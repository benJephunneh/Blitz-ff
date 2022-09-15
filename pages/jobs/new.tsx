import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createJob from "app/jobs/mutations/createJob"
import { JobForm } from "app/jobs/components/JobForm"
import { FORM_ERROR } from "app/core/components/forms/Form"

const NewJobPage = () => {
  const router = useRouter()
  const [createJobMutation] = useMutation(createJob)

  return (
    <Layout title={"Create New Job"}>
      <h1>Create New Job</h1>

      <JobForm
        submitText="Create Job"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateJob}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const job = await createJobMutation(values)
            await router.push(Routes.ShowJobPage({ jobId: job.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        {/* <Link href={Routes.JobsPage()}>
          <a>Jobs</a>
        </Link> */}
      </p>
    </Layout>
  )
}

NewJobPage.authenticate = true

export default NewJobPage
