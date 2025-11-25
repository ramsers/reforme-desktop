import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Class } from '@reformetypes/classTypes'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import ManageClassBookingModal from './ManageClassBookingModal'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import AddClientModal from './AddClientModal'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import TableRow from '@components/table/TableRow'
import PaginationButtons from '@components/table/PaginationButtons'
import Button from '@components/button/button'
import { API_PAGESIZE } from 'consts/consts'

type BookingTableProps = {
    classes: ShortPaginatedResponse<Class>
    setCurrentPage: (page: number) => void
    currentPage: number
}

const BookingTable: React.FC<BookingTableProps> = ({ classes, setCurrentPage, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isAddClientOpen, setIsAddClientOpen] = useState(false)
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
    const bookedClass = useSelector((state: RootState) =>
        selectedClassId ? state.class.classes?.data?.results.find((cls) => cls.id === selectedClassId) || null : null
    )

    const handleOpenModal = (cls: Class) => {
        setSelectedClassId(cls.id)
        setIsOpen(true)
    }

    const handleOpenAddClientModal = (cls: Class) => {
        setSelectedClassId(cls.id)
        setIsAddClientOpen(true)
    }

    const totalPages = Math.ceil(classes.count / API_PAGESIZE)

    return (
        <>
            <TableContainer>
                <TableHeader className="grid grid-cols-12 p-2 md:grid-cols-24">
                    <div className="col-span-3 md:col-span-6">Date</div>
                    <div className="col-span-3 md:col-span-6">Class</div>
                    <div className="hidden text-center md:col-span-6 md:block">Instructor</div>
                    <div className="col-span-3 text-center md:col-span-2">Capacity</div>
                    <div className="col-span-3 text-right md:col-span-4">Actions</div>
                </TableHeader>
                {classes.count > 0 ? (
                    classes.results.map((cls) => (
                        <TableRow
                            key={cls.id}
                            className="grid cursor-pointer grid-cols-12 border-b hover:bg-gray-50 md:grid-cols-24"
                            onClick={() =>
                                cls.bookingsCount > 0 ? handleOpenModal(cls) : handleOpenAddClientModal(cls)
                            }
                        >
                            <div className="col-span-3 font-bold md:col-span-6">
                                <p>{dayjs(cls.date).format('D MMM')}</p>
                            </div>

                            <div className="col-span-3 truncate font-semibold md:col-span-6">{cls.title}</div>

                            <div className="hidden truncate text-center font-semibold md:col-span-6 md:block">
                                {cls?.instructor?.name ?? '—'}
                            </div>

                            <div className="col-span-3 text-center font-semibold md:col-span-2">
                                {`${cls.bookingsCount}/${cls.size}`}
                            </div>

                            <div className="col-span-3 flex flex-row flex-wrap items-center justify-center gap-2 md:col-span-4 md:justify-end">
                                {cls.bookingsCount > 0 && (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleOpenModal(cls)
                                        }}
                                        variant="text"
                                        icon={<PencilIcon />}
                                        className="p-0 text-xs"
                                    />
                                )}

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleOpenAddClientModal(cls)
                                    }}
                                    icon={<PlusIcon className="h-4 w-4" />}
                                    variant="text"
                                    text="Add client"
                                    className="p-0 text-xs"
                                />
                            </div>
                        </TableRow>
                    ))
                ) : (
                    <p className="pt-3 text-center">No classes found</p>
                )}
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>
            <ManageClassBookingModal isOpen={isOpen} bookedClass={bookedClass} setIsOpen={setIsOpen} />
            <AddClientModal
                isOpen={isAddClientOpen}
                onClose={() => setIsAddClientOpen(false)}
                setIsOpen={setIsAddClientOpen}
                classId={selectedClassId}
            />
        </>
    )
}

export default BookingTable
