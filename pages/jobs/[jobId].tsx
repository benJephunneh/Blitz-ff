import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getJob from "app/jobs/queries/getJob"
import deleteJob from "app/jobs/mutations/deleteJob"

export const Job = () => {
  const router = useRouter()
  const jobId = useParam("jobId", "number")
  const [deleteJobMutation] = useMutation(deleteJob)
  const [job] = useQuery(getJob, { id: jobId })

  return (
    <>
      <Head>
        <title>Job {job.id}</title>
      </Head>

      <div>
        <h1>Job {job.id}</h1>
        <pre>{JSON.stringify(job, null, 2)}</pre>

        {/* <Link href={Routes.EditJobPage({ jobId: job.id })}>
          <a>Edit</a>
        </Link> */}

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteJobMutation({ id: job.id })
              // await router.push(Routes.JobsPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowJobPage = () => {
  return (
    <div>
      <p>
        {/* <Link href={Routes.JobsPage()}>
          <a>Jobs</a>
        </Link> */}
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Job />
      </Suspense>
    </div>
  )
}

ShowJobPage.authenticate = true
ShowJobPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowJobPage
