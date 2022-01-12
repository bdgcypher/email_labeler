import Head from 'next/head'
import Login from '../components/login'

export default function Home() {
  return (
    <>
      <Head>
        <title>Branch Login</title>
        <meta name="description" content="Branch Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}
