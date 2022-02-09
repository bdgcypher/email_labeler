import Head from 'next/head';
import dynamic from 'next/dynamic';
import Sidebar from '../../components/sidebar';
import { useState } from 'react';

const SwipingInterface = dynamic(() => import('../../components/labeler/swiping_interface'), {
  ssr: false
})


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
      <SwipingInterface datasetExamples={datasetExamples} setDatasetExamples={setDatasetExamples} />
    </>
  )
}
