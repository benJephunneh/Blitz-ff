import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getJob from "app/jobs/queries/getJob"
import updateJob from "app/jobs/mutations/updateJob"
import { JobForm } from "app/jobs/components/JobForm"
import { FORM_ERROR } from "app/core/components/forms/Form"

export const EditJob = () => {
  const router = useRouter()
  const jobId = useParam("jobId", "number")
  const [job, { setQueryData }] = useQuery(
    getJob,
    { id: jobId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateJobMutation] = useMutation(updateJob)

  return (
    <>
      <Head>
        <title>Edit Job {job?.id}</title>
      </Head>

      <div>
        <h1>Edit Job {job?.id}</h1>
        <pre>{JSON.stringify(job, null, 2)}</pre>

        {/* <JobForm
          submitText="Update Job"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateJob}
          initialValues={job}
          onSubmit={async (values) => {
            try {
              const updated = await updateJobMutation({
                id: job.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowJobPage({ jobId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        /> */}
      </div>
    </>
  )
}

const EditJobPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditJob />
      </Suspense>

      <p>
        {/* <Link href={Routes.JobsPage()}>
          <a>Jobs</a>
        </Link> */}
      </p>
    </div>
  )
}

EditJobPage.authenticate = true
EditJobPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditJobPage
