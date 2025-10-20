import { RootState } from '@store/index'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Class } from '@reformetypes/classTypes'
import dayjs from 'dayjs'
import { PencilIcon } from '@heroicons/react/24/solid'
import { deleteClass, fetchClass } from '@store/slices/classSlice'
import CreateClassForm from '@features/dashboard/classes/CreateEditClassForm'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import TableRow from '@components/table/TableRow'
import PaginationButtons from '@components/table/PaginationButtons'
import { TrashIcon } from '@heroicons/react/24/outline'
import Modal from '@components/modal/Modal'

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
    const [isDeleteClassModalOpen, setIsDeleteClassModalOpen] = useState(false)
    const [deleteSeries, setDeleteSeries] = useState(false)
    const [classToDelete, setClassToDelete] = useState<string | null>(null)

    const dispatch = useDispatch()

    const handleFetchClass = (id: string) => {
        dispatch(fetchClass(id))
        setIsOpen(true)
    }

    const pageSize = 10
    const totalPages = Math.ceil(classes.count / pageSize)

    const handleDeleteClass = () => {
        dispatch(
            deleteClass({
                id: classToDelete!, // the class ID you stored in state
                deleteSeries, // the flag object for API
            })
        )
    }

    return (
        <>
            <TableContainer>
                <TableHeader
                    columns={[
                        { label: 'Date', span: 6 },
                        { label: 'Class Name', span: 6 },
                        { label: 'Instructor', span: 6 },
                        { label: '', span: 6, align: 'right' },
                    ]}
                />

                {classes.count > 0 ? (
                    classes.results.map((cls) => (
                        <TableRow
                            key={cls.id}
                            onClick={() => handleFetchClass(cls.id)}
                            spans={[6, 6, 6, 6]}
                            children={[
                                <div className="font-bold">
                                    <p>{dayjs(cls.date).format('D MMM')}</p>
                                </div>,
                                <p className="font-semibold">{cls.title}</p>,
                                <p className="font-semibold">{cls?.instructor?.name ?? ''}</p>,
                                <div className="flex flex-row items-center justify-end gap-2">
                                    <button
                                        className="hover:text-dashboard-action flex cursor-pointer justify-self-end p-1 text-blue-600"
                                        onClick={() => handleFetchClass(cls.id)}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>

                                    <button
                                        className="hover:text-dashboard-action flex cursor-pointer justify-self-end p-1 text-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setIsDeleteClassModalOpen(true)
                                            setClassToDelete(cls.id)
                                        }}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>,
                            ]}
                        />
                    ))
                ) : (
                    <p className="pt-3 text-center">No classes found</p>
                )}

                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>
            <CreateClassForm title={'Edit class'} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Modal
                isOpen={isDeleteClassModalOpen}
                onClose={() => setIsDeleteClassModalOpen(false)}
                title="Delete class"
                content={
                    <div className="flex flex-col gap-4">
                        <p>Are you sure you want to delete this class?</p>
                        <div className="flex flex-row items-center gap-2">
                            <input
                                type="checkbox"
                                checked={deleteSeries}
                                onChange={(e) => setDeleteSeries(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <p className="pt-0.5">Delete this and all future classes</p>
                        </div>
                    </div>
                }
                confirmText="Delete"
                onConfirm={() => handleDeleteClass()}
                btnColor="bg-red-600"
            />
        </>
    )
}

const mapStateToProps = (store: RootState): ClassesTableSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): ClassesTableDispatchProps => ({})

export default ClassesTable
