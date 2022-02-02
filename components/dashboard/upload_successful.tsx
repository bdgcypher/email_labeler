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
                        You have completed all the steps and your dataset has been uploaded to our server. Your dataset is now being processed by our system. 
                        This could take a while so go get a snack, maybe watch a youtube video or something and check back in a bit!
                    </p>
                </div>
            </div>
        </div>
    )
}