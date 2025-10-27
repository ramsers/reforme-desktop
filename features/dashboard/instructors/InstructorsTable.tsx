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
                <TableHeader
                    columns={[
                        { label: 'Name', span: 6 },
                        { label: 'Email', span: 6 },
                        { label: 'Phone number', span: 6 },
                        { label: 'Created on', span: 4 },
                        { label: '', span: 2, align: 'center' },
                    ]}
                />

                {(instructors.count > 0 &&
                    instructors?.results.map((instructor) => (
                        <TableRow
                            key={instructor.id}
                            onClick={() => handleSetUser(instructor.id)}
                            spans={[6, 6, 6, 4, 2]}
                            children={[
                                <div className="font-bold">
                                    <p className="truncate font-semibold">{instructor?.name || null}</p>
                                </div>,
                                <p className="truncate font-semibold">{instructor?.email || null}</p>,
                                <p className="truncate font-semibold">{instructor?.phoneNumber || null}</p>,
                                <p className="truncate font-semibold">
                                    {dayjs(instructor.createdAt).format('DD/MM/YYYY')}
                                </p>,
                                <Button
                                    onClick={() => handleSetUser(instructor.id)}
                                    icon={<PencilIcon className="h-4 w-4" />}
                                    variant="text"
                                />,
                            ]}
                        />
                    ))) || <p className="pt-3 text-center">No instructors found</p>}
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
