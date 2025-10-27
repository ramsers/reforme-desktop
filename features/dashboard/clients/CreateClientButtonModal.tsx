import { PlusIcon } from '@heroicons/react/24/solid'
import CreateEditClassForm from './CreateEditClientForm'
import React, { useState } from 'react'
import CreateEditClientForm from './CreateEditClientForm'
import Button from '@components/button/button'

const CreateClientButtonModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
                icon={<PlusIcon className="h-5 w-5" />}
                text="Create client"
                variant="dashboard"
            />
            <CreateEditClientForm isOpen={isOpen} setIsOpen={setIsOpen} title="Create client" />
        </div>
    )
}

export default CreateClientButtonModal
