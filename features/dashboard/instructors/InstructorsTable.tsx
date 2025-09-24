import { RootState } from '@store/index'
import React, { useContext, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import dayjs from 'dayjs'
import { PencilIcon } from '@heroicons/react/24/solid'
import CreateClassForm from '@features/dashboard/classes/CreateEditClassForm'
import { User } from '@reformetypes/userTypes'
import CreateEditInstructorForm from './CreateEditInstructorForm'
import { fetchUser } from '@store/slices/userSlice'
import { InstructorTableContext } from './instructors/InstructorTableContextProvider'

type InstructorsTableOwnProps = {
    instructors: User[]
}

type InstructorsTableSliceProps = {}

type InstructorsTableDispatchProps = {}

type InstructorsTableProps = InstructorsTableOwnProps & InstructorsTableSliceProps & InstructorsTableDispatchProps

const InstructorsTable: React.FC<InstructorsTableProps> = ({ instructors }) => {
    const dispatch = useDispatch()
    const context = useContext(InstructorTableContext)

    if (!context) return null

    const { isOpen, handleOpenInstructorModal, handleCloseInstructorModal, handleSetInstructorId } = context

    const handleSetUser = (id: string) => {
        handleSetInstructorId(id)
        handleOpenInstructorModal()
    }

    return (
        <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
            <div className="grid grid-cols-24 border-b text-sm font-bold text-gray-600">
                <p className="col-span-6 p-2">Name</p>
                <p className="col-span-6 p-2">Email</p>
                <p className="col-span-6 p-2">Phone number</p>
                <p className="col-span-4 p-2">Created on</p>
                <p className="col-span-2 p-2 text-center" />
            </div>

            {instructors.map((instructor) => (
                <div key={instructor.id} className="flex grid grid-cols-24 flex-row items-center border-b text-sm">
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{instructor?.name || null}</p>
                    </div>
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{instructor?.email || null}</p>
                    </div>
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{instructor?.phoneNumber || null}</p>
                    </div>
                    <div className="col-span-4 p-2">
                        <p className="font-semibold">{dayjs(instructor.createdAt).format('DD/MM/YYYY')}</p>
                    </div>
                    <div className="col-span-2 p-2 text-center">
                        <button
                            className="hover:text-dashboard-action text-blue-600"
                            onClick={() => handleSetUser(instructor.id)}
                        >
                            <PencilIcon className={'h-4 w-4'} />
                        </button>
                    </div>
                </div>
            ))}
            <CreateEditInstructorForm isOpen={isOpen} setIsOpen={handleCloseInstructorModal} title="Edit instructor" />
        </div>
    )
}

const mapStateToProps = (store: RootState): InstructorsTableSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): InstructorsTableDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorsTable)
