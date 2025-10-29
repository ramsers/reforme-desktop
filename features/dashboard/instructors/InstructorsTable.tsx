import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { PencilIcon } from '@heroicons/react/24/solid'
import { User } from '@reformetypes/userTypes'
import CreateEditInstructorForm from './CreateEditInstructorForm'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import TableRow from '@components/table/TableRow'
import PaginationButtons from '@components/table/PaginationButtons'
import Button from '@components/button/button'

type InstructorsTableOwnProps = {
    instructors: ShortPaginatedResponse<User>
    setCurrentPage: (page: number) => void
    currentPage: number
}

type InstructorsTableProps = InstructorsTableOwnProps

const InstructorsTable: React.FC<InstructorsTableProps> = ({ instructors, setCurrentPage, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null)

    const handleSetUser = (id: string) => {
        setSelectedInstructorId(id)
        setIsOpen(true)
    }

    const pageSize = 10
    const totalPages = Math.ceil(instructors.count / pageSize)

    return (
        <>
            <TableContainer>
                <TableHeader className="grid grid-cols-12 gap-2 p-2 md:grid-cols-24">
                    <div className="col-span-2 md:col-span-6">Name</div>
                    <div className="col-span-3 md:col-span-6">Email</div>
                    <div className="col-span-3 md:col-span-6">Phone number</div>
                    <div className="col-span-2 hidden md:col-span-4 md:block">Created on</div>
                    <div className="col-span-4 text-center md:col-span-2 md:text-left">Actions</div>
                </TableHeader>

                {instructors.count > 0 ? (
                    instructors.results.map((instructor) => (
                        <TableRow
                            key={instructor.id}
                            onClick={() => handleSetUser(instructor.id)}
                            className="grid grid-cols-12 gap-2 md:grid-cols-24"
                        >
                            <div className="col-span-2 truncate font-bold md:col-span-6">
                                <p className="truncate font-semibold">{instructor?.name || '—'}</p>
                            </div>

                            <div className="col-span-3 truncate font-semibold md:col-span-6 md:block">
                                {instructor?.email || '—'}
                            </div>

                            <div className="col-span-3 truncate font-semibold md:col-span-6 md:block">
                                {instructor?.phoneNumber || '—'}
                            </div>

                            <div className="col-span-2 hidden font-semibold md:col-span-4 md:block">
                                {dayjs(instructor.createdAt).format('DD/MM/YYYY')}
                            </div>

                            <div className="col-span-4 text-center md:col-span-2 md:text-left">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSetUser(instructor.id)
                                    }}
                                    variant="text"
                                    text="Edit"
                                />
                            </div>
                        </TableRow>
                    ))
                ) : (
                    <p className="pt-3 text-center">No instructors found</p>
                )}

                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>

            <CreateEditInstructorForm
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
                title="Edit instructor"
                selectedInstructorId={selectedInstructorId}
            />
        </>
    )
}

export default InstructorsTable
