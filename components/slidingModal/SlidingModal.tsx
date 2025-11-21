import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '@components/button/button'

type SlidingModalProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
    children: React.ReactNode
    onClick?: () => void
    content: string
    onClose?: () => void
    isValid?: boolean
    isSubmitting?: boolean
}

const SlidingModal: React.FC<SlidingModalProps> = ({
    isOpen,
    setIsOpen,
    title,
    children,
    onClick,
    content,
    onClose,
    isValid,
    isSubmitting,
}) => {
    console.log('SLIDING MODAL SUBMITTED =====================')

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => (onClose && onClose()) || setIsOpen(false)}>
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
                                <div className="flex w-full flex-row justify-end px-6 pt-3">
                                    <button
                                        onClick={() => (onClose && onClose()) || setIsOpen(false)}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <XMarkIcon className="h-7 w-7" />
                                    </button>
                                </div>

                                <div className="flex min-h-0 flex-grow flex-col gap-4 overflow-y-auto p-6 pb-24">
                                    <Dialog.Title className="text-2xl font-bold">{title}</Dialog.Title>
                                    {children}
                                </div>

                                {onClick && (
                                    <div className="border-gray-10 absolute right-0 bottom-0 left-0 flex justify-end gap-2 border-t bg-white p-4 inset-shadow-2xs">
                                        <Button
                                            text="Cancel"
                                            onClick={() => (onClose && onClose()) || setIsOpen(false)}
                                            className="w-[50%]"
                                            variant="neutral"
                                        />
                                        <Button
                                            type="submit"
                                            text={content}
                                            onClick={() => onClick()}
                                            className="w-[50%]"
                                            disabled={!isValid}
                                            isLoading={isSubmitting}
                                        />
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SlidingModal
