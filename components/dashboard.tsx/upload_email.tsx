import React, { useState, Fragment } from 'react';
import { HiOutlineMail } from 'react-icons/hi'
import { BsImage } from 'react-icons/bs'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Dialog, Transition, Listbox } from '@headlessui/react'



export default function UploadEmail() {
    var steps = [
        { name: 'Step 1', href: '#', status: 'current', id: 0 },
        { name: 'Step 2', href: '#', status: 'upcoming', id: 1 },
        { name: 'Step 3', href: '#', status: 'upcoming', id: 2 },
        { name: 'Step 4', href: '#', status: 'upcoming', id: 3 },
    ]

    var currentStep = steps[0]
    const setCurrentStep = () => {
        if (currentStep.id <= 2) {
            steps[currentStep.id].status = 'complete';
            currentStep = steps[(currentStep.id + 1)];
            steps[currentStep.id].status = 'current';
            console.log(steps[currentStep.id]);
        } else {
            console.log(steps[currentStep.id])
        }
    }

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
                                    <a href={step.href} className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
                                        <span className="sr-only">{step.name}</span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Request Your Data
                    </Dialog.Title>
                    <div className="mt-2 px-4">
                        <p className="text-sm text-gray-500">
                            Login to the email account you want to get the emails for. Then go to <a href="https://takeout.google.com/" target="_blank" className="text-blue-500 hover:underline">https://takeout.google.com/</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-6">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => { setCurrentStep() }}
                >
                    Next Step
                </button>
            </div>
        </>
    )
}
