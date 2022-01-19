import * as React from 'react'
import { Dialog } from '@headlessui/react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function UploadProgress({setUploadInProgress, setProcessingInProgress}) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? setUploadInProgress(false) & setProcessingInProgress(true) : prevProgress + 10));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <div className="mt-3 mb-4 text-center sm:mt-5 px-6">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Upload In Progress
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        This may take a while, so sit tight. You are almost done.
                    </p>
                </div>
            </div>
            <hr className="h-px my-2 bg-gray-500" />
            <div className="flex flex-row">
                <div className="px-4 sm:p-6">
                    <dt className="text-base font-normal text-gray-900">Uploaded</dt>
                    <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                        <div className="flex items-baseline text-2xl font-semibold text-blue-600">
                            {progress}%
                            <span className="ml-2 text-sm font-medium text-gray-500">of 8.57GB</span>
                        </div>
                    </dd>

                </div>
                <div className="m-auto">
                    <Stack spacing={2} direction="row">
                        <CircularProgress variant="determinate" value={progress} />
                    </Stack>
                </div>
            </div>
        </div>
    )
}