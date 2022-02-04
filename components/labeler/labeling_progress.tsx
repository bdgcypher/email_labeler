import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Domain, apiKey } from '../domain';

const cookies = new Cookies();

const user = cookies.get('user');

const dataset_id = cookies.get('dataset_id');

var stats = []

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}



export default function LabelingProgress() {

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

    var datasetStats = cookies.get('datasetStats');

    return (
        // Section container
        <div className="h-80 md:h-96 px-2 md:px-10 lg:px-20 bg-gray-900">
            {/* progress card container */}
            <div className="pt-6">
                <dl className="grid grid-cols-2 rounded-lg bg-white overflow-hidden shadow divide-x divide-gray-200">
                    {stats.map((item) => (
                        <div key={item.name} className="px-4 py-5 sm:p-6">
                            <dt className="text-xs md:text-base font-normal text-gray-900">{item.name}</dt>
                            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                                <div className="flex items-baseline text-md md:text-2xl font-semibold text-blue-600">
                                    {item.stat}
                                    <span className="ml-2 text-xs md:text-sm font-medium text-gray-500">of {item.of}</span>
                                </div>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
            {/* question text */}
            <div className="flex flex-row justify-center p-4 md:p-10 text-md lg:text-2xl text-gray-400">Would you have liked to have received a notification about this email?</div>
        </div>
    )
};


