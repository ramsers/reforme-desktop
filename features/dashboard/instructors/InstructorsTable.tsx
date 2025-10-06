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
                                <button
                                    className="hover:text-dashboard-action flex justify-self-center text-blue-600"
                                    onClick={() => handleSetUser(instructor.id)}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>,
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

        // <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
        //     <div className="grid grid-cols-24 border-b text-sm font-bold text-gray-600">
        //         <p className="col-span-6 p-2">Name</p>
        //         <p className="col-span-6 p-2">Email</p>
        //         <p className="col-span-6 p-2">Phone number</p>
        //         <p className="col-span-4 p-2">Created on</p>
        //         <p className="col-span-2 p-2 text-center" />
        //     </div>

        // {(instructors.count > 0 &&
        //     instructors?.results.map((instructor) => (
        //         <div key={instructor.id} className="flex grid grid-cols-24 flex-row items-center border-b text-sm">
        //             <div className="col-span-6 p-2">
        //                 <p className="font-semibold">{instructor?.name || null}</p>
        //             </div>
        //             <div className="col-span-6 p-2">
        //                 <p className="font-semibold">{instructor?.email || null}</p>
        //             </div>
        //             <div className="col-span-6 p-2">
        //                 <p className="font-semibold">{instructor?.phoneNumber || null}</p>
        //             </div>
        //             <div className="col-span-4 p-2">
        //                 <p className="font-semibold">{dayjs(instructor.createdAt).format('DD/MM/YYYY')}</p>
        //             </div>
        //             <div className="col-span-2 p-2 text-center">
        //                 <button
        //                     className="hover:text-dashboard-action text-blue-600"
        //                     onClick={() => handleSetUser(instructor.id)}
        //                 >
        //                     <PencilIcon className={'h-4 w-4'} />
        //                 </button>
        //             </div>
        //         </div>
        //     ))) || <p className="pt-3 text-center">No instructors found</p>}
        // <CreateEditInstructorForm
        //     isOpen={isOpen}
        //     setIsOpen={() => setIsOpen(false)}
        //     title="Edit instructor"
        //     selectedInstructorId={selectedInstructorId}
        // />
        //     <div className="mt-4 flex justify-end gap-2">
        //         {Array.from({ length: totalPages }, (_, i) => (
        //             <button
        //                 key={i}
        //                 onClick={() => setCurrentPage(i + 1)}
        //                 className={`rounded px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        //             >
        //                 {i + 1}
        //             </button>
        //         ))}
        //     </div>
        // </div>
    )
}

export default InstructorsTable
