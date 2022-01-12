import Head from 'next/head'
import Register from '../components/register'

export default function Home() {
  return (
    <>
      <Head>
        <title>NotifAI Sign up</title>
        <meta name="description" content="Sign up to label emails for us!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Register />
    </>
  )
}
