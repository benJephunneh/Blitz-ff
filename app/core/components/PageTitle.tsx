import Head from "next/head"

const PageTitle = ({ title = "ABST" }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/abst icon.ico" />
    </Head>
  )
}

export default PageTitle
