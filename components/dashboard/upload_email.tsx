import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import FileUploader from './upload_file';
import { FaTimesCircle } from 'react-icons/fa';



export default function UploadEmail({ setEmail, setUploadInProgress, setOpen }) {
    var steps = [
        { name: 'Step 1', href: '#', status: 'current', id: 0 },
        { name: 'Step 2', href: '#', status: 'upcoming', id: 1 },
        { name: 'Step 3', href: '#', status: 'upcoming', id: 2 },
        { name: 'Step 4', href: '#', status: 'upcoming', id: 3 },
        { name: 'Step 5', href: '#', status: 'upcoming', id: 4 },
        { name: 'Step 6', href: '#', status: 'upcoming', id: 5 },
        { name: 'Step 7', href: '#', status: 'upcoming', id: 6 },
    ]

    var [stepCounter, setStepCounter] = useState(0)

    var currentStep = steps[0]

    const setCurrentStep = () => {
        if (currentStep.id <= 5) {
            steps[currentStep.id].status = 'complete';
            currentStep = steps[(currentStep.id + 1)];
            steps[currentStep.id].status = 'current';
            console.log(steps[currentStep.id - 1]);
            console.log(steps[currentStep.id]);
        } else {
            console.log(steps[currentStep.id])
        }
    }

    for (let i = 0; i < stepCounter; i++) {
        setCurrentStep()
    };



    return (

        <>
            <div>
                <nav className="flex items-center justify-center" aria-label="Progress">
                    <p className="text-sm font-medium">
                        Step {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
                    </p>
                    <ol role="list" className="ml-8 flex items-center space-x-5">
                        {steps.map((step) => (
                            <li key={step.name}>
                                {step.status === 'complete' ? (
                                    <a href={step.href} className="block w-2.5 h-2.5 bg-blue-600 rounded-full hover:bg-blue-900">
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                ) : step.status === 'current' ? (
                                    <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                                        <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                                            <span className="w-full h-full rounded-full bg-blue-200" />
                                        </span>
                                        <span className="relative block w-2.5 h-2.5 bg-blue-600 rounded-full" aria-hidden="true" />
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                ) : (
                                    <a href={step.href} className="block w-2.5 h-2.5 bg-gray-200 rounded-full cursor-default">
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                {steps[0].status === 'current' ? (
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Navigate to https://takeout.google.com/
                        </Dialog.Title>
                        <div className="mt-2 px-4">
                            <p className="text-sm text-gray-500">
                                <b>Please note, we suggest following these instructions on a computer.</b>
                                <br />
                                <br />
                                Go to <a href="https://takeout.google.com/" target="_blank" className="text-blue-500 hover:underline">https://takeout.google.com/</a> and make sure you are logged into
                                the gmail account you want to download emails for.
                            </p>
                        </div>
                    </div>
                ) : steps[1].status === 'current' ? (
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Click the “Deselect All” button.
                        </Dialog.Title>
                        <div className="mt-2 px-4">
                            <br />
                            <img src='/deselect.jpg' />
                        </div>
                    </div>
                ) : steps[2].status === 'current' ? (
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Select "Mail"
                        </Dialog.Title>
                        <div className="mt-2 px-4">
                            <p className="text-sm text-gray-500">
                                Scroll down till you see the section that says "Mail" and select it.
                            </p>
                            <br />
                            <img src='/select_email.png' />
                        </div>
                    </div>
                ) : steps[3].status === 'current' ? (
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Hit "Next Step"
                        </Dialog.Title>
                        <div className="mt-2 px-4">
                            <p className="text-sm text-gray-500">
                                Scroll to the bottom of the page and hit the "Next Step" button.
                            </p>
                            <br />
                            <img src='/next_step.png' />
                        </div>
                    </div>
                ) : steps[4].status === 'current' ? (
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Hit the “Create Export” button.
                        </Dialog.Title>
                        <div className="mt-2 px-4">
                            <p className="text-sm text-gray-500">
                                Hit the “Create Export” button. A download link will be sent to your email; it may take a while for the link to be sent, so take a break and relax while you wait for the email to arrive.
                            </p>
                            <img src='/create_export.png'/>
                        </div>
                    </div>
                ) : steps[5].status === 'current' ? (
                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Download your emails
                        </Dialog.Title>
                        <div className="mt-2 px-4">
                            <p className="text-sm text-gray-500">
                            <b>The more emails you have the longer it will take to recieve the email from google. In some cases, this could take several hours.</b> Once the email has come in, go to your gmail inbox, open the email from "Google Takeout", and click "Download your files".
                            </p>
                            <img src='/download_files.png'/>
                        </div>
                    </div>
                ) : steps[6].status === 'current' ? (
                    null
                ) : null}
            </div>
            <div className="mt-5 sm:mt-6">
                {steps[6].status === 'current' ? (
                    <FileUploader />
                ) : (
                    <>
                        <div className="p-2 flex flex-row columns-2 gap-4">

                            {steps[0].status === 'current' ? (
                                <button
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                    onClick={() => { { setStepCounter(stepCounter + 1) }; { steps[4].status === 'current' ? setEmail(false) & setUploadInProgress(true) : null } }}
                                >
                                    {steps[6].status === 'current' ? 'Upload Data' : 'Next'}
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                        onClick={() => { { setStepCounter(stepCounter - 1) };}}
                                    >
                                        {steps[6].status === 'current' ? 'Upload Data' : 'Previous'}
                                    </button>
                                    <button
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                        onClick={() => { { setStepCounter(stepCounter + 1) };}}
                                    >
                                        {steps[6].status === 'current' ? 'Upload Data' : 'Next'}
                                    </button>
                                </>
                            )
                            }

                        </div>
                    </>
                )}
            </div>
        </>
    )
}
