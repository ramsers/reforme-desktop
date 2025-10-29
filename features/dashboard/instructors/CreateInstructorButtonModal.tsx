import { RootState } from '@store/index'
import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PlusIcon } from '@heroicons/react/24/solid'
import CreateEditInstructorForm from '@features/dashboard/instructors/CreateEditInstructorForm'
import { InstructorTableContext } from './instructors/InstructorTableContextProvider'
import Button from '@components/button/button'

type CreateInstructorButtonModalOwnProps = {}

type CreateInstructorButtonModalSliceProps = {}

type CreateInstructorButtonModalDispatchProps = {}

type CreateInstructorButtonModalProps = CreateInstructorButtonModalOwnProps &
    CreateInstructorButtonModalSliceProps &
    CreateInstructorButtonModalDispatchProps

const CreateInstructorButtonModal: React.FC<CreateInstructorButtonModalProps> = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} icon={<PlusIcon />} text="Create instructor" variant="dashboard" />
            <CreateEditInstructorForm title={'Create instructor'} isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
        </div>
    )
}

const mapStateToProps = (store: RootState): CreateInstructorButtonModalSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): CreateInstructorButtonModalDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstructorButtonModal)
