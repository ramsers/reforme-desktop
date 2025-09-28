import { RootState } from '@store/index'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

type SlidingModalOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
    children: React.ReactNode
    onClick: () => void
    content: string
    onClose?: () => void
}

type SlidingModalSliceProps = {}

type SlidingModalDispatchProps = {}

type SlidingModalProps = SlidingModalOwnProps & SlidingModalSliceProps & SlidingModalDispatchProps

const SlidingModal: React.FC<SlidingModalProps> = ({
    isOpen,
    setIsOpen,
    title,
    children,
    onClick,
    content,
    onClose,
}) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => (onClose && onClose()) || setIsOpen(false)}>
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
                            <Dialog.Panel className="relative flex h-full w-screen max-w-md flex-col bg-white shadow-xl">
                                <button
                                    onClick={() => (onClose && onClose()) || setIsOpen(false)}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>

                                <div className="flex flex-col gap-4 overflow-visible p-6 pb-24">
                                    <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
                                    {children}
                                </div>

                                <div className="border-gray-10 absolute right-0 bottom-0 left-0 flex justify-end gap-2 border-t bg-white p-4 inset-shadow-2xs">
                                    <button
                                        onClick={() => (onClose && onClose()) || setIsOpen(false)}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => onClick()}
                                        type={'submit'}
                                        disabled={false}
                                        className="bg-brown-default w-full rounded-md px-4 py-2 font-semibold text-white"
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

const mapStateToProps = (store: RootState): SlidingModalSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): SlidingModalDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SlidingModal)
