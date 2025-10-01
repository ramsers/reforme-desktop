import { RootState } from '@store/index'
import React, { useContext, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import dayjs from 'dayjs'
import { PencilIcon } from '@heroicons/react/24/solid'
import CreateClassForm from '@features/dashboard/classes/CreateEditClassForm'
import { User } from '@reformetypes/userTypes'
import CreateEditInstructorForm from './CreateEditInstructorForm'
import { fetchUserInfo } from '@store/slices/userSlice'
import { InstructorTableContext } from './instructors/InstructorTableContextProvider'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'

type InstructorsTableOwnProps = {
    instructors: ShortPaginatedResponse<User>
    setCurrentPage: (page: number) => void
    currentPage: number
}

type InstructorsTableSliceProps = {}

type InstructorsTableDispatchProps = {}

type InstructorsTableProps = InstructorsTableOwnProps & InstructorsTableSliceProps & InstructorsTableDispatchProps

const InstructorsTable: React.FC<InstructorsTableProps> = ({ instructors, setCurrentPage, currentPage }) => {
    const dispatch = useDispatch()
    const context = useContext(InstructorTableContext)

    if (!context) return null

    const { isOpen, handleOpenInstructorModal, handleCloseInstructorModal, handleSetInstructorId } = context

    const handleSetUser = (id: string) => {
        handleSetInstructorId(id)
        handleOpenInstructorModal()
    }

    const pageSize = 10
    const totalPages = Math.ceil(instructors.count / pageSize)

    return (
        <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
            <div className="grid grid-cols-24 border-b text-sm font-bold text-gray-600">
                <p className="col-span-6 p-2">Name</p>
                <p className="col-span-6 p-2">Email</p>
                <p className="col-span-6 p-2">Phone number</p>
                <p className="col-span-4 p-2">Created on</p>
                <p className="col-span-2 p-2 text-center" />
            </div>

            {(instructors.count > 0 &&
                instructors?.results.map((instructor) => (
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
                ))) || <p className="pt-3 text-center">No instructors found</p>}
            <CreateEditInstructorForm isOpen={isOpen} setIsOpen={handleCloseInstructorModal} title="Edit instructor" />
            <div className="mt-4 flex justify-end gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`rounded px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (store: RootState): InstructorsTableSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): InstructorsTableDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorsTable)
