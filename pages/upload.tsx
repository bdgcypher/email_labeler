import Head from 'next/head'
import { useState } from 'react';
import Sidebar from '../components/sidebar'
import Upload from '../components/upload/upload';

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
            <Upload />
        </>
    )
}
