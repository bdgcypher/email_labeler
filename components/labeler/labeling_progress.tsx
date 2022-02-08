import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Domain, apiKey } from '../domain';

const cookies = new Cookies();

const user = cookies.get('userAuth');

const dataset_id = cookies.get('datasetId');

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}



export default function LabelingProgress() {

    const [stats, setStats] = useState({total_size: '', num_labeled: '', num_to_label: '', dataset_accuracy: ''});

    const getDatasetStats = () => {
        try {
            axios.get(`${Domain}dataset/${dataset_id}/stats`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => { console.log(response); setStats(response.data); console.log((parseFloat(response.data.dataset_accuracy) * 100).toFixed(2), "% accurate"); });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDatasetStats()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
          getDatasetStats();
        }, 1000);
        return () => clearInterval(interval);
      }, []);


    return (
        // Section container
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
            <div className="flex flex-row justify-center p-4 md:p-10 text-md lg:text-2xl text-gray-400">Would you have liked to receive a notification about this email?</div>
        </div>
    )
};


