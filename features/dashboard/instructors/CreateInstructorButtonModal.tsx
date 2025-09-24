import { RootState } from '@store/index'
import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PlusIcon } from '@heroicons/react/24/solid'
import CreateEditInstructorForm from '@features/dashboard/instructors/CreateEditInstructorForm'
import { InstructorTableContext } from './instructors/InstructorTableContextProvider'

type CreateInstructorButtonModalOwnProps = {}

type CreateInstructorButtonModalSliceProps = {}

type CreateInstructorButtonModalDispatchProps = {}

type CreateInstructorButtonModalProps = CreateInstructorButtonModalOwnProps &
    CreateInstructorButtonModalSliceProps &
    CreateInstructorButtonModalDispatchProps

const CreateInstructorButtonModal: React.FC<CreateInstructorButtonModalProps> = () => {
    const context = useContext(InstructorTableContext)

    if (!context) return null

    const { isOpen, handleOpenInstructorModal, handleCloseInstructorModal } = context

    return (
        <div>
            <button
                onClick={() => handleOpenInstructorModal()}
                className="group bg-dashboard-action text-main flex cursor-pointer flex-row items-center gap-1 rounded-lg px-3 py-2 font-semibold transition-colors hover:bg-white"
            >
                <PlusIcon className="group-hover:text-dashboard-action h-5 w-5" />

                <span className="group-hover:text-dashboard-action">Create instructor</span>
            </button>

            <CreateEditInstructorForm
                title={'Create instructor'}
                isOpen={isOpen}
                setIsOpen={handleCloseInstructorModal}
            />
        </div>
    )
}

const mapStateToProps = (store: RootState): CreateInstructorButtonModalSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): CreateInstructorButtonModalDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstructorButtonModal)
