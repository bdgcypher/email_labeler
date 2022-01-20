import Head from 'next/head'
import SwipingInterface from '../components/labeler/swiping_interface'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <>
      <Head>
        <title>NotifAI</title>
        <meta name="description" content="NotifAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="h-80 bg-gray-900" />
      <SwipingInterface />
    </>
  )
}
