import Head from 'next/head'
import DatasetSelection from '../components/dashboard/dataset_selection'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>NotifAI</title>
        <meta name="description" content="NotifAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <DatasetSelection />
    </>
  )
}
