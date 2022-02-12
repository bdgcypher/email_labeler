import { RiCloseFill } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdSwipe } from 'react-icons/md';
import { CardSwiper } from './card_swiper_function';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Domain, apiKey } from '../domain';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const cookies = new Cookies();

const user = cookies.get('userAuth');

const dataset_id = cookies.get('datasetId');

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function SwipingInterface({ datasetExamples, setDatasetExamples }) {

    const [stats, setStats] = useState({ total_size: '', num_labeled: '', num_to_label: '', dataset_accuracy: '' });

    const getDatasetStats = () => {
        try {
            axios.get(`${Domain}dataset/${dataset_id}/stats`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => { console.log(response); setStats(response.data); console.log((parseFloat(response.data.dataset_accuracy) * 100).toFixed(2), "% accurate"); }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    {
                        error.response.status === 401 ? (
                            window.location.replace('/login')
                        ) : (console.log(error.response.message))
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log(error.message);
                }
                console.log(error.config);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDatasetStats()
    }, [])

    const checkExpiredExamples = (datasetExamples: any) => {
        for (const example of datasetExamples) {
            console.log("now: ", Math.floor(Date.now() / 1000))
            console.log("expires: ", example.expires)
            example.expires <= Math.floor(Date.now() / 1000) ? (
                console.log('expired example'),
                getDatasetExamples()
            ) : example.expires >= Math.floor(Date.now() / 1000) ? (
                console.log('not expired')
            ) : (
                console.log('something is off with getExpiredExamples')
            )
        }
    }

    console.log(dataset_id)

    const getDatasetExamples = () => {
        user === undefined ? (window.location.replace('/login')) : (null)
        console.log(user.token)
        try {
            let numOfExamples = 1
            axios.get(`${Domain}content/${dataset_id}/${numOfExamples}`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => {
                console.log("examples: ", response.data);
                setDatasetExamples(response.data);
                getDatasetStats();
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    {
                        error.response.status === 401 ? (
                            window.location.replace('/login')
                        ) : (console.log(error.response.message))
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log(error.message);
                }
                console.log(error.config);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDatasetExamples()
    }, [])

    var batchLabelCounter = 1;

    const handleSwipe = (d: any, uuid: any) => {
        console.log(uuid)
        console.log(batchLabelCounter)
        checkExpiredExamples(datasetExamples)

        if (d === "right") {

            let body = [
                {
                    "id": uuid,
                    "label": true
                }
            ]

            let config = {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                },
            }

            try {
                axios.post(`${Domain}content/${dataset_id}`,
                    JSON.stringify(body), config
                ).then(response => { console.log(response); batchLabelCounter === 1 ? getDatasetExamples() : batchLabelCounter++ }
                ).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        {
                            error.response.status === 401 ? (
                                window.location.replace('/login')
                            ) : (console.log(error.response.message))
                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

                console.log(datasetExamples)
            } catch (err) {
                console.log(err);
            }
            console.log("yes I wanted a notification")
        } else if (d === "left") {

            let body = [
                {
                    "id": uuid,
                    "label": false
                }
            ]

            let config = {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                },
            }

            try {
                axios.post(`${Domain}content/${dataset_id}`,
                    JSON.stringify(body), config
                ).then(response => { console.log(response); batchLabelCounter === 1 ? getDatasetExamples() : batchLabelCounter++ }
                ).catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        {
                            error.response.status === 401 ? (
                                window.location.replace('/login')
                            ) : (console.log(error.response.message))
                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log(error.message);
                    }
                    console.log(error.config);
                });
                console.log(datasetExamples)
            } catch (err) {
                console.log(err);
            }
            console.log("no I didn't want a notification")
        }
    };


    return (
        
        <div className="relative overflow-x-hidden sm:max-w-full touch-pan-y h-screen w-screen">
            {/* Stats container */}
            <div className="h-80 md:h-96 px-2 md:px-10 lg:px-20 bg-gray-900">
                {/* progress card container */}
                <div className="pt-6">
                    <dl className="grid grid-cols-2 rounded-lg bg-white overflow-hidden shadow divide-x-2 divide-gray-300">
                        <div key={"0"} className="px-4 py-5 sm:p-6">
                            <dt className="text-xs md:text-base font-normal text-gray-900">Labeling Progress</dt>
                            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                                <div className="flex items-baseline text-md md:text-2xl font-semibold text-blue-600">
                                    {stats.num_labeled}
                                    <span className="ml-2 text-xs md:text-sm font-medium text-gray-500">of {stats.total_size}</span>
                                </div>
                            </dd>
                        </div>
                        <div key={"1"} className="px-4 py-5 sm:p-6">
                            <dt className="text-xs md:text-base font-normal text-gray-900">Dataset Accuracy</dt>
                            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                                <div className="flex items-baseline text-md md:text-2xl font-semibold text-blue-600">
                                    {(parseFloat(stats.dataset_accuracy) * 100).toFixed(2)}
                                    <span className="ml-2 text-xs md:text-sm font-medium text-gray-500">of 95%</span>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
                {/* question text */}
                <div className="flex flex-row justify-center p-4 pt-4 md:pt-6 text-md lg:text-xl text-gray-400">If you received an email with this content today, would you want to receive a notification or alert about that email?</div>
                <div className="hidden flex-row justify-center p-0 md:p-0 text-md lg:flex lg:text-lg text-gray-500"><MdSwipe className="text-xl mr-2" /> Click and drag cards to label</div>
                <div className="flex flex-row justify-center p-0 md:p-0 text-md lg:hidden lg:text-lg text-gray-500"><MdSwipe className="text-xl mr-2" /> Swipe cards to label</div>
            </div>
            {/* cards to swipe */}
            <div id="swiper-container" className="bg-gray-100 p-10 md:p-20 lg:px-40 overflow-hidden rounded-md">
                {
                    datasetExamples.map(content => (
                        <div key={content.id}>
                            <CardSwiper
                                onSwipe={handleSwipe}
                                uuid={content.id}
                                detectingSize={100}
                                className="absolute top-80 md:top-1/3 lg:top-1/3 -mt-10 lg:mt-28 left-10 right-10 h-1/2 lg:h-1/2 m-auto lg:w-2/3 bg-white rounded-md p-4 lg:p-20 overflow-y-auto overflow-x-hidden shadow-xl border-b-8 border-b-white cursor-pointer"
                                contents={
                                    //Email content will go here vvv
                                    <>
                                        {content.example.email.display_is_html ? (
                                            content.example.email.display.replace(/(<style([\S\s]*?)>([\S\s]*?)<\/style>>)/g, ""),


                                            <>
                                                <div className="break-all">
                                                    <h1 className="text-md text-gray-900 break-all">From:</h1>
                                                    <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all" dangerouslySetInnerHTML={{ __html: content.example.email.from }}></p>
                                                </div>
                                                <div className="mt-2">
                                                    <h1 className="text-md text-gray-900 break-all">Subject:</h1>
                                                    <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all" dangerouslySetInnerHTML={{ __html: content.example.email.subject }}></p>
                                                </div>
                                                <div className="object-contain overflow-x-hidden mt-8 p-2 ">
                                                    <div className="test pointer-events-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.example.email.display) }}></div>
                                                    {/* <iframe srcDoc={example.display} height="800" className="rounded-md overflow-x-hidden pointer-events-none"></iframe> */}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-row break-all">
                                                    <h1 className="text-md text-gray-900 break-all">From:</h1>
                                                    <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all">{content.example.email.from}</p>
                                                </div>
                                                <div className="flex flex-row mt-2">
                                                    <h1 className="text-md text-gray-900 break-all">Subject:</h1>
                                                    <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all">{content.example.email.subject}</p>
                                                </div>
                                                <div className="flex flex-row mt-8 break-all">
                                                    <p className="text-xs md:text-sm w-5/6 text-gray-500 break-all">
                                                        {content.example.email.display}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                    </>
                                }
                            />
                        </div>
                    ))
                }
                <div className="absolute bottom-1/3 left-0 h-12 lg:h-20 w-8 lg:w-20 pt-4 lg:pt-6 pl-2 lg:pl-6 bg-red-200 rounded-r-full shadow-xl">
                    <RiCloseFill className="text-red-700 lg:text-3xl" />
                </div>
                <div className="absolute bottom-1/3 right-0 h-12 lg:h-20 w-8 lg:w-20 pt-4 lg:pt-6 pl-2 lg:pl-8 bg-green-200 rounded-l-full shadow-xl">
                    <AiOutlineCheck className="text-green-700 lg:text-3xl" />
                </div>
            </div>
        </div>
    );
}