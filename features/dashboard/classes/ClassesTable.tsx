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
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import TableRow from '@components/table/TableRow'
import PaginationButtons from '@components/table/PaginationButtons'

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

    const pageSize = 10
    const totalPages = Math.ceil(classes.count / pageSize)

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
                                <button
                                    className="hover:text-dashboard-action flex justify-self-end text-blue-600"
                                    onClick={() => handleFetchClass(cls.id)}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>,
                            ]}
                        />
                    ))
                ) : (
                    <p className="pt-3 text-center">No classes found</p>
                )}

                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>
            <CreateClassForm title={'Edit class'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

const mapStateToProps = (store: RootState): ClassesTableSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): ClassesTableDispatchProps => ({})

export default ClassesTable
