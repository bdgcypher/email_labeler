import { RiCloseFill } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';
import { CardSwiper } from './card_swiper_function';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Domain, apiKey } from '../domain';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const cookies = new Cookies();

const user = cookies.get('userAuth');

const dataset_id = cookies.get('dataset_id');


export default function SwipingInterface() {

    const [datasetExamples, setDatasetExamples] = useState([]);

    const getDatasetStats = () => {
        try {
            axios.get(`${Domain}dataset/${dataset_id}/stats`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => { console.log(response); cookies.set('datasetStats', response.data); });
        } catch (err) {
            console.log(err);
        }
    }

    console.log(dataset_id)

    const getDatasetExamples = () => {
        console.log(user.token)
        try {
            let numOfExamples = 5
            axios.get(`${Domain}content/${dataset_id}/${numOfExamples}`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => {
                console.log(response.data);
                setDatasetExamples(response.data);
                // datasetExamples.map(example => (renderHtml('hello', example.id)))
                console.log('examples: ', datasetExamples);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDatasetExamples()
    }, [])

    var batchLabelCounter = 0;

    const handleSwipe = (d: any, uuid: any) => {
        console.log(uuid)
        console.log(batchLabelCounter)

        if (d === "right") {

            let body = {
                "uuid": uuid,
                "sentiment": false
            }

            let config = {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                },
            }

            try {
                axios.post(`${Domain}content/${dataset_id}`,
                    JSON.stringify(body), config
                ).then(response => { console.log(response); batchLabelCounter === 3 ? getDatasetExamples() : batchLabelCounter++ });

                console.log(datasetExamples)
            } catch (err) {
                console.log(err);
            }
            console.log("yes I wanted a notification")
        } else if (d === "left") {

            let body = {
                "uuid": uuid,
                "sentiment": false
            }

            let config = {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                },
            }

            try {
                axios.post(`${Domain}content/${dataset_id}`,
                    JSON.stringify(body), config
                ).then(response => { console.log(response); batchLabelCounter === 3 ? getDatasetExamples() : batchLabelCounter++ });
                console.log(datasetExamples)
            } catch (err) {
                console.log(err);
            }
            console.log("no I didn't want a notification")
        }
    };

    return (
        <div id="swiper-container" className="bg-gray-100 p-10 md:p-20 lg:px-40 md:mx-auto overflow-x-hidden rounded-md">
            {
                datasetExamples.map(example => (
                    <div key={example.id}>
                        <CardSwiper
                            onSwipe={handleSwipe}
                            uuid={example.id}
                            detectingSize={100}
                            className=" absolute top-80 md:top-1/3 left-10 right-10 h-1/2 lg:h-2/3 m-auto lg:w-5/6 bg-white rounded-md p-4 lg:p-20 overflow-y-auto shadow-xl border-b-8 border-b-white "
                            contents={
                                //Email content will go here vvv
                                <>
                                    {example.display_is_html ? (
                                        example.display.replace(/(<style([\S\s]*?)>([\S\s]*?)<\/style>>)/g, ""),


                                        <>
                                            <div className="break-all">
                                                <h1 className="text-md text-gray-900 break-all">From:</h1>
                                                <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all" dangerouslySetInnerHTML={{ __html: example.from }}></p>
                                            </div>
                                            <div className="mt-2">
                                                <h1 className="text-md text-gray-900 break-all">Subject:</h1>
                                                <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all" dangerouslySetInnerHTML={{ __html: example.subject }}></p>
                                            </div>
                                            <div className="object-contain overflow-x-hidden mt-8 p-2 ">
                                                <div className="test pointer-events-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(example.display) }}></div>
                                                {/* <iframe srcDoc={example.display} height="800" className="rounded-md overflow-x-hidden pointer-events-none"></iframe> */}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-row break-all">
                                                <h1 className="text-md text-gray-900 break-all">From:</h1>
                                                <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all">{example.from}</p>
                                            </div>
                                            <div className="flex flex-row mt-2">
                                                <h1 className="text-md text-gray-900 break-all">Subject:</h1>
                                                <p className="text-xs md:text-sm text-gray-500 ml-2 mt-1 break-all">{example.subject}</p>
                                            </div>
                                            <div className="flex flex-row mt-8 break-all">
                                                <p className="text-xs md:text-sm w-5/6 text-gray-500 break-all">
                                                    {example.display}
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
    );
}