import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import UploadEmail from '../dashboard/upload_email';
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Domain, apiKey } from '../domain'
import { FaTimesCircle } from 'react-icons/fa';

const cookies = new Cookies();

const user = cookies.get('user');

cookies.set('userAuth', user);

const dataset_types = [
    { type: 'Email', format: '.mbox' },
    // { type: 'Image', format: '.png or .jpg' },
    // { type: 'Text', format: '.txt or .pdf or .docx' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



export default function LabelingSuccess() {

    const [open, setOpen] = useState(true)

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

        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => { }}>
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
                            <button onClick={() => { setOpen(false); window.location.replace('/') }} className="float-right focus:outline-none">
                                <FaTimesCircle className="text-xl text-red-700" />
                            </button>
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5 px-6">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Congratulations!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            You have completed all the required labeling for this dataset. Good work! Make sure to mark that you 
                                            have finished labeling next time you record your hours in the Google Form.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}