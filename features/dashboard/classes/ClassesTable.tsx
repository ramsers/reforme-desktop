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
import Button from '@components/button/button'
import { AsyncResource } from '@reformetypes/common/ApiTypes'

type ClassesTableOwnProps = {
    classes: ShortPaginatedResponse<Class>
    setCurrentPage: (page: number) => void
    currentPage: number
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
                id: classToDelete!,
                deleteSeries,
            })
        )
        setIsDeleteClassModalOpen(false)
    }

    return (
        <>
            <TableContainer>
                <TableHeader className="grid grid-cols-12 p-2 md:grid-cols-24">
                    <div className="col-span-4 md:col-span-6">Date</div>
                    <div className="col-span-4 md:col-span-6">Class Name</div>
                    <div className="hidden md:col-span-6 md:block">Instructor</div>
                    <div className="col-span-4 text-center md:col-span-6 md:text-right">Actions</div>
                </TableHeader>
                {classes.count > 0 ? (
                    classes.results.map((cls) => (
                        <TableRow
                            key={cls.id}
                            onClick={() => handleFetchClass(cls.id)}
                            className="grid cursor-pointer grid-cols-12 p-2 hover:bg-gray-50 md:grid-cols-24"
                        >
                            <div className="col-span-4 font-bold md:col-span-6">
                                <p>{dayjs(cls.date).format('D MMM')}</p>
                            </div>

                            <div className="col-span-4 truncate font-semibold md:col-span-6">{cls.title}</div>

                            <div className="hidden truncate font-semibold md:col-span-6 md:block">
                                {cls?.instructor?.name ?? '—'}
                            </div>

                            <div className="col-span-4 flex justify-center gap-2 md:col-span-6 md:justify-end">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleFetchClass(cls.id)
                                    }}
                                    variant="text"
                                    icon={<PencilIcon />}
                                />

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsDeleteClassModalOpen(true)
                                        setClassToDelete(cls.id)
                                    }}
                                    className="text-red-600 transition-colors hover:text-black"
                                    icon={<TrashIcon />}
                                    variant="text"
                                />
                            </div>
                        </TableRow>
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
