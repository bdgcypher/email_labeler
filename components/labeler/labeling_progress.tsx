import React from 'react';

const stats = [
  { name: 'Labeling Progress', stat: '59121', of: '71920'},
  { name: 'Model Accuracy', stat: '24.56%', of: '95%'},
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LabelingProgress() {
    return (
        // Section container
        <div className="h-80 md:h-96 px-2 md:px-10 lg:px-20 bg-gray-900">
            {/* progress card container */}
            <div className="pt-6">
                <dl className="grid grid-cols-2 rounded-lg bg-white overflow-hidden shadow divide-x divide-gray-200">
                    {stats.map((item) => (
                        <div key={item.name} className="px-4 py-5 sm:p-6">
                            <dt className="text-xs md:text-base font-normal text-gray-900">{item.name}</dt>
                            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                                <div className="flex items-baseline text-md md:text-2xl font-semibold text-blue-600">
                                    {item.stat}
                                    <span className="ml-2 text-xs md:text-sm font-medium text-gray-500">of {item.of}</span>
                                </div>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
            {/* question text */}
            <div className="flex flex-row justify-center p-4 md:p-10 text-md text-gray-400">Would you have liked to have received a notification about this email?</div>
        </div>
    )
};


