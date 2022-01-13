import React from 'react';
import { HiOutlineMail } from 'react-icons/hi'
import { BsImage } from 'react-icons/bs'
import { AiOutlineCloudUpload } from 'react-icons/ai'

const datasets = [
    {
        id: 1,
        title: 'Personal Emails',
        type: 'Email',
    },
    {
        id: 2,
        title: 'Fire Dataset',
        type: 'Image',
    },
]

export default function DatasetSelection() {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                <li key={0}>
                    <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-medium text-gray-900 truncate">Your Datasets</p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Upload Dataset
                                        <AiOutlineCloudUpload className="flex-shrink-0 ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                {datasets.map((dataset) => (
                    <li key={dataset.id}>
                        <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-blue-600 truncate">{dataset.title}</p>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            {dataset.type === 'Email' && <HiOutlineMail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            {dataset.type === 'Image' && <BsImage className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            {dataset.type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}