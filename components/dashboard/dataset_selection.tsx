import React, { useState, Fragment } from 'react';
import { HiOutlineMail } from 'react-icons/hi'
import { BsImage } from 'react-icons/bs'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import UploadEmail from './upload_email';
import UploadSuccessful from './upload_successful';
import UploadError from './upload_error';
import UploadProgress from './upload_progress';
import ProcessStatus from './process_status';
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Domain, apiKey } from '../domain'

const cookies = new Cookies();

const user = cookies.get('user');

cookies.set('userAuth', user)

var datasets = []

// request the user's datasets
try {
    console.log(user.token)
    axios.get(`${Domain}dataset`, {
        headers: {
            "Api-Key": apiKey,
            "Authorization": user.token
        }
    }).then(response => { console.log(response); cookies.set('datasets', response.data); });
} catch (err) {
    console.log(err);
}

datasets = cookies.get('datasets')

const dataset_types = [
    { type: 'Email', format: '.mbox' },
    // { type: 'Image', format: '.png or .jpg' },
    // { type: 'Text', format: '.txt or .pdf or .docx' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



export default function DatasetSelection() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(dataset_types[0])


    const [email, setEmail] = useState(false)

    const [uploadInProgress, setUploadInProgress] = useState(false);
    const [processingStatus, setProcessingStatus] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [uploadSuccessful, setUploadSuccessful] = useState(false);

    const [status, setStatus] = useState('PROCESSING')
    const [clickedDatasetId, setClickedDatasetId] = useState('')

    // Find the status of each upload for the clicked dataset and display modals for PROCESSING and FAILED. Reroute to labeler for SUCCESS

    const getDatasetStatus = (dataset: any) => {
        let datasetUploads = []
        let datasetStatus = '';
        let uploadProcessing = 'PROCESSING';
        let uploadFailure = 'FAILED';
        let uploadSuccess = 'SUCCESS';
        for (const upload of dataset.upload_info) {
            console.log(upload.processing_status)
            uploadProcessing === upload.processing_status ? datasetUploads.push('PROCESSING') : uploadFailure === upload.processing_status ? datasetUploads.push('FAILED') : uploadSuccess === upload.processing_status ? datasetUploads.push('SUCCESS') : null;
        }
        console.log(datasetUploads)
        for (const status of datasetUploads) {
            console.log(status)
            uploadProcessing === status ? datasetStatus = 'PROCESSING' : uploadFailure === status ? datasetStatus = 'FAILED' : datasetStatus = 'SUCCESS';
        }
        datasetStatus === 'PROCESSING' ? (
            setStatus('PROCESSING'),
            setOpen(true),
            setProcessingStatus(true),
            cookies.set('dataset_id', dataset.id),
            console.log('status', status, dataset.id)
        ) : datasetStatus === 'FAILED' ? (
            setStatus('FAILED'),
            setClickedDatasetId(dataset.id),
            setOpen(true),
            setProcessingStatus(true),
            console.log('status', status)
        ) : datasetStatus === 'SUCCESS' ? (
            cookies.set('dataset_id', dataset.id),
            window.location.replace(`/labeler/${dataset.id}`)
        ) : (console.log("couldn't find processing status", dataset.upload_info))
    }

    // Deleting datasets that weren't processed correctly
    const deleteDataset = (dataset_id: any) => {
        try {
            console.log(dataset_id)
            axios.delete(`${Domain}dataset/${dataset_id}`, {
                headers: {
                    "Api-Key": apiKey,
                    "Authorization": user.token
                }
            }).then(response => { console.log(response); window.location.reload(); });
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <>
            <div className="bg-white shadow-lg overflow-hidden m-2 md:mx-auto lg:mt-20 rounded-md md:w-1/2">
                <ul role="list" className="divide-y divide-gray-200">
                    <li key={0}>
                        <a href="#" className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-medium text-gray-900 truncate">Your Datasets</p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(true)}
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
                    {datasets ? (datasets.map((dataset) => (
                        <li key={dataset.id}>
                            {/* <a href={`/labeler/${dataset.name}`} className="block hover:bg-gray-50"> */}
                            <div onClick={() => { getDatasetStatus(dataset) }} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <p className="text-md font-medium text-blue-600 truncate">{dataset.name}</p>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            {dataset.data_type === 'mbox' && <HiOutlineMail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            {dataset.data_type === 'Image' && <BsImage className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            {dataset.data_type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* </a> */}
                        </li>
                    ))) : (
                        <li>
                            <a>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-md font-medium text-blue-600 truncate"></p>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => { setOpen(false); setEmail(false); setUploadInProgress(false); setProcessingStatus(false); setUploadError(false); setUploadSuccessful(false); }}>
                    <div className="flex items-end justify-center pt-60 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-10 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                {email ? (
                                    <UploadEmail setEmail={setEmail} setUploadInProgress={setUploadInProgress} />
                                ) : uploadInProgress ? (
                                    <>
                                        <UploadProgress setUploadInProgress={setUploadInProgress} setUploadSuccess={setUploadSuccessful} />
                                    </>
                                ) : uploadSuccessful ? (
                                    <>
                                        <UploadSuccessful />
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Ok
                                            </button>
                                        </div>
                                    </>
                                ) : uploadError ? (
                                    <>
                                        <UploadError />
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Ok
                                            </button>
                                        </div>
                                    </>
                                ) : processingStatus ? (
                                    <>
                                        <ProcessStatus status={status} />
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                                onClick={() => { setProcessingStatus(false), setOpen(false), status === "FAILED" ? deleteDataset(clickedDatasetId) : null }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </>
                                ) :
                                    <>
                                        <div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    Select Dataset Type
                                                </Dialog.Title>
                                                <div className="mt-2 px-4">
                                                    <p className="text-sm text-gray-500">
                                                        What type of data do you need to label?
                                                    </p>
                                                </div>
                                            </div>
                                            <Listbox value={selected} onChange={setSelected}>
                                                {({ open }) => (
                                                    <>
                                                        <div className="mt-1 relative">
                                                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                                                <span className="w-full inline-flex truncate">
                                                                    <span className="truncate">{selected.type}</span>
                                                                    <span className="ml-2 truncate text-gray-500">{selected.format}</span>
                                                                </span>
                                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-20 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    {dataset_types.map((dataset_type) => (
                                                                        <Listbox.Option
                                                                            key={dataset_type.format}
                                                                            className={({ active }) =>
                                                                                classNames(
                                                                                    active ? 'text-white bg-blue-600' : 'text-gray-900',
                                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                )
                                                                            }
                                                                            value={dataset_type}
                                                                        >
                                                                            {({ selected, active }) => (
                                                                                <>
                                                                                    <div className="flex">
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'truncate')}>
                                                                                            {dataset_type.type}
                                                                                        </span>
                                                                                        <span className={classNames(active ? 'text-blue-200' : 'text-gray-500', 'ml-2 truncate')}>
                                                                                            {dataset_type.format}
                                                                                        </span>
                                                                                    </div>

                                                                                    {selected ? (
                                                                                        <span
                                                                                            className={classNames(
                                                                                                active ? 'text-white' : 'text-blue-600',
                                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                            )}
                                                                                        >
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null}
                                                                                </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                    </>
                                                )}
                                            </Listbox>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                                onClick={selected.type === 'Email' ? () => setEmail(true) : null}
                                            >
                                                Select
                                            </button>
                                        </div>
                                    </>}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    )
}