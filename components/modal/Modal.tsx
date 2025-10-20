import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    content: React.ReactNode
    confirmText?: string
    onConfirm?: () => void
    btnColor?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    content,
    confirmText = 'Confirm',
    onConfirm,
    btnColor = 'bg-blue-600',
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-50"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-50"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>

                {/* Centered modal */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="gap-4transform flex w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                {/* Header */}
                                <Dialog.Title
                                    as="h3"
                                    className="flex items-center justify-between text-lg leading-6 font-medium text-gray-900"
                                >
                                    {title}
                                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                        ✕
                                    </button>
                                </Dialog.Title>

                                {/* Content */}
                                <div>{content}</div>

                                {/* Footer */}
                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        onClick={onClose}
                                        className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                    {onConfirm && (
                                        <button
                                            onClick={onConfirm}
                                            className={`rounded ${btnColor} px-4 py-2 text-white hover:bg-blue-700`}
                                        >
                                            {confirmText}
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal
