import Head from 'next/head'
import Register from '../components/register'

export default function Home() {
  return (
    <>
      <Head>
        <title>Branch Sign up</title>
        <meta name="description" content="Frontend of GTC product demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Register />
    </>
  )
}
