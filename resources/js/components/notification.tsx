'use client';

import type { SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import { CircleCheckIcon, XIcon } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

export default function Notification() {
    interface Notification {
        message: string;
        type: 'success' | 'failure';
        title: string;
    }
    const [show, setShow] = useState(false);

    const { notification } = usePage<SharedData>().props;

    useEffect(() => {
        if (notification) {
            setShow(true);
        }
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }, [notification]);

    const setComponent: { success: JSX.Element; failure: JSX.Element } = {
        success: <CircleCheckIcon aria-hidden="true" className="h-6 w-6 text-green-400" />,
        failure: <XIcon aria-hidden="true" className="h-6 w-6 text-red-400" />,
    };

    const setClass: { success: string; failure: string } = {
        success: 'text-green-600',
        failure: 'text-red-600',
    };

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            {notification ? (
                <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                        <Transition show={show}>
                            <div className="ring-opacity-5 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black transition data-[closed]:opacity-0 data-[enter]:transform data-[enter]:duration-300 data-[enter]:ease-out data-[closed]:data-[enter]:translate-y-2 data-[leave]:duration-100 data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">{setComponent[notification.type]}</div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className={`text-sm font-medium ${setClass[notification.type]}`}>{notification.title}</p>
                                            <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShow(false);
                                                }}
                                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                <span className="sr-only">Close</span>
                                                <XIcon aria-hidden="true" className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            ) : null}
        </>
    );
}
