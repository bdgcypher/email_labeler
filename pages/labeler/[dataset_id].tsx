import Head from 'next/head';
import dynamic from 'next/dynamic';
import LabelingProgress from '../../components/labeler/labeling_progress';
import Sidebar from '../../components/sidebar';

const SwipingInterface = dynamic(() => import('../../components/labeler/swiping_interface'), {
  ssr: false
})


export default function Home() {

  
  return (
    <>
      <Head>
        <title>NotifAI</title>
        <meta name="description" content="NotifAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <LabelingProgress />
      <SwipingInterface />
    </>
  )
}
