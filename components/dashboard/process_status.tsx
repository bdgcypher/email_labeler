import * as React from 'react'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'

export default function ProcessStatus() {

const [status, setStatus ] = useState('PROCESSING')

    return (
        <div>
            <div className="mt-3 mb-4 text-center sm:mt-5 px-6">
                {status === 'PROCESSING' ? (
                    <>
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Processing Dataset
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                This may take a while, so sit tight. You are almost done.
                            </p>
                        </div>
                    </>
                ) : status === 'ERROR' ? (
                    <>
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Processing Error
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                There was an error processing the dataset on our side  :'(  You will need to try uploading it again
                            </p>
                        </div>
                    </>
                ) : (null)
                }
            </div>
        </div>
    )
}