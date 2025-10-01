import { RootState } from '@store/index'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Class } from '@reformetypes/classTypes'
import dayjs from 'dayjs'
import { PencilIcon } from '@heroicons/react/24/solid'
import { fetchClass } from '@store/slices/classSlice'
import CreateClassForm from '@features/dashboard/classes/CreateEditClassForm'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'

type ClassesTableOwnProps = {
    classes: ShortPaginatedResponse<Class>
    setCurrentPage: (page: number) => void
    currentPage: number
    // isOpen: boolean
    // setIsOpen: (opened: boolean) => void
}

type ClassesTableSliceProps = {}

type ClassesTableDispatchProps = {}

type ClassesTableProps = ClassesTableOwnProps & ClassesTableSliceProps & ClassesTableDispatchProps

const ClassesTable: React.FC<ClassesTableProps> = ({ classes, setCurrentPage, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const handleFetchClass = (id: string) => {
        dispatch(fetchClass(id))
        setIsOpen(true)
    }

    const pageSize = 10 // match your DRF PAGE_SIZE
    const totalPages = Math.ceil(classes.count / pageSize)

    return (
        <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
            {/*{Table header}*/}
            <div className="grid grid-cols-24 border-b text-sm font-semibold text-gray-600">
                <p className="col-span-6 p-2">Date</p>
                <p className="col-span-8 p-2">Class Name</p>
                <p className="col-span-6 p-2">Instructor</p>
                <p className="col-span-4 p-2 text-center" />
            </div>
            {/*/!*{Table body}*!/*/}

            {classes?.results?.map((cls) => (
                <div key={cls.id} className="flex grid grid-cols-24 flex-row items-center border-b text-sm">
                    <div className="col-span-6 p-2">
                        <div className="bg-brown-10 w-fit rounded-lg p-3 font-bold">
                            <p>{dayjs(cls.date).format('D MMM')}</p>
                        </div>
                    </div>
                    <div className="col-span-8 p-2">
                        <p className="font-semibold">{cls.title}</p>
                    </div>
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{cls?.instructor?.name || null}</p>
                    </div>
                    <div className="col-span-4 p-2 text-center">
                        <button
                            className="hover:text-dashboard-action text-blue-600"
                            onClick={() => handleFetchClass(cls.id)}
                        >
                            <PencilIcon className={'h-4 w-4'} />
                        </button>
                    </div>
                </div>
            ))}
            <CreateClassForm title={'Edit class'} isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="mt-4 flex gap-2">
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

const mapStateToProps = (store: RootState): ClassesTableSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): ClassesTableDispatchProps => ({})

export default ClassesTable
