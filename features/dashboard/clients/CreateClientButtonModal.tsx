import { PlusIcon } from '@heroicons/react/24/solid'
import CreateEditClassForm from './CreateEditClientForm'
import React, { useState } from 'react'
import CreateEditClientForm from './CreateEditClientForm'

const CreateClientButtonModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="group bg-dashboard-action text-main flex cursor-pointer flex-row items-center gap-1 rounded-lg px-3 py-2 font-semibold transition-colors hover:bg-white"
            >
                <PlusIcon className="group-hover:text-dashboard-action h-5 w-5" />

                <span className="group-hover:text-dashboard-action">Create client</span>
            </button>
            <CreateEditClientForm isOpen={isOpen} setIsOpen={setIsOpen} title="Create client" />
        </div>
    )
}

export default CreateClientButtonModal
