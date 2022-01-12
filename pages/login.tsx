import Head from 'next/head'
import Login from '../components/login'

export default function Home() {
  return (
    <>
      <Head>
        <title>NotifAI Login</title>
        <meta name="description" content="NotifAI Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}
