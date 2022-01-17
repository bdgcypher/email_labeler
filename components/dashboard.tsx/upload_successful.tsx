import React from 'react'
import { Dialog } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

export default function UploadSuccessful() {
    return (
        <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5 px-6">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Upload Successful
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        You have completed all the steps and are ready to go. Nice job!
                    </p>
                </div>
            </div>
        </div>
    )
}