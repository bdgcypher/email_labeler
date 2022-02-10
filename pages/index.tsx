import Head from 'next/head'
import { useState } from 'react';
import DatasetSelection from '../components/dashboard/dataset_selection'
import Sidebar from '../components/sidebar'

//this is my comment

export default function Home() {

  const [datasetExamples, setDatasetExamples] = useState([]);

  return (
    <>
      <Head>
        <title>NotifAI</title>
        <meta name="description" content="NotifAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar datasetExamples={datasetExamples} />
      <DatasetSelection />
    </>
  )
}
