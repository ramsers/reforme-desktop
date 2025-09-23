import {RootState} from '@store/index'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import { Dialog, Transition } from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/solid";


type SlidingModalOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
    children: JSX.Element
    onClick: () => void
    content: string
    onClose?: () => void
}

type SlidingModalSliceProps = {}

type SlidingModalDispatchProps = {}

type SlidingModalProps = SlidingModalOwnProps &
    SlidingModalSliceProps &
    SlidingModalDispatchProps

const SlidingModal: React.FC<SlidingModalProps> = ({isOpen, setIsOpen, title, children, onClick, content, onClose}) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => onClose && onClose() || setIsOpen(false)}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                {/* Panel container */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 flex justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative w-screen max-w-md bg-white shadow-xl h-full flex flex-col">
                                <button
                                    onClick={() => onClose && onClose() || setIsOpen(false)}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>

                                <div className="overflow-y-auto p-6 pb-24 gap-4 flex flex-col">
                                    <Dialog.Title className="text-2xl font-bold">
                                        {title}
                                    </Dialog.Title>
                                    {children}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-10 inset-shadow-2xs p-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => onClose && onClose() || setIsOpen(false)}
                                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 w-full"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => onClick()}
                                        type={"submit"}
                                        className="px-4 py-2 rounded-md bg-brown-default text-white font-semibold w-full"
                                    >
                                        {content}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

const mapStateToProps = (store: RootState): SlidingModalSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): SlidingModalDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(SlidingModal)
