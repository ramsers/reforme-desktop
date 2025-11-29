import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import CreateEditInstructorForm from '@features/dashboard/instructors/CreateEditInstructorForm'
import Button from '@components/button/button'

const CreateInstructorButtonModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} icon={<PlusIcon />} text="Create instructor" variant="dashboard" />
            <CreateEditInstructorForm title={'Create instructor'} isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
        </div>
    )
}

export default CreateInstructorButtonModal
