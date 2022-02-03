import * as React from 'react'
import { Dialog } from '@headlessui/react'
import axios from 'axios';
import { Domain, apiKey } from '../domain';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const user = cookies.get('user');



export default function ProcessStatus(status: any) {

    return (
        <div>
            <div className="mt-3 mb-4 text-center sm:mt-5 px-6">
                {status.status === 'PROCESSING' ? (
                    <>
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Processing Dataset
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Our system is working hard to process your files. This may take a while, so sit tight. Maybe get a drink and wash your hands, then check back in a bit.
                            </p>
                        </div>
                    </>
                ) : status.status === 'FAILED' ? (
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