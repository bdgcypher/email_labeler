import React from 'react'
import { Dialog } from '@headlessui/react'
import { BiSad } from 'react-icons/bi'

export default function UploadError() {
    return (
        <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <BiSad className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5 px-8">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Something Went Wrong
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        The upload did not complete successfully. Try uploading the file again by clicking the button below.
                    </p>
                </div>
            </div>
        </div>
    )
}