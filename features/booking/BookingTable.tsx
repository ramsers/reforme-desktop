import Modal from '@components/modal/Modal'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Booking } from '@reformetypes/bookingTypes'
import { Class } from '@reformetypes/classTypes'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import ManageClassBookingModal from './ManageClassBookingModal'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import AddClientModal from './AddClientModel'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import TableRow from '@components/table/TableRow'
import PaginationButtons from '@components/table/PaginationButtons'

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
        selectedClassId ? state.class.classes?.results.find((cls) => cls.id === selectedClassId) || null : null
    )

    const handleOpenModal = (cls: Class) => {
        setSelectedClassId(cls.id)
        setIsOpen(true)
    }

    const handleOpenAddClientModal = (cls: Class) => {
        setSelectedClassId(cls.id)
        setIsAddClientOpen(true)
    }

    const pageSize = 10
    const totalPages = Math.ceil(classes.count / pageSize)

    return (
        <>
            <TableContainer>
                <TableHeader
                    columns={[
                        { label: 'Date', span: 6 },
                        { label: 'Class', span: 6 },
                        { label: 'Instructor', span: 6, align: 'center' },
                        { label: 'Capacity', span: 2, align: 'center' },
                        { label: '', span: 4, align: 'center' },
                    ]}
                />
                {classes.count > 0 &&
                    classes?.results.map((cls) => (
                        <TableRow
                            key={cls.id}
                            spans={[6, 6, 6, 2, 4]}
                            children={[
                                <div className="font-bold">
                                    <p>{dayjs(cls.date).format('D MMM')}</p>
                                </div>,
                                <p className="truncate font-semibold">{cls.title}</p>,
                                <p className="truncate text-center font-semibold">{cls.instructor?.name}</p>,
                                <p className="text-center font-semibold">{`${cls.bookingsCount}/${cls.size}`}</p>,
                                <div className="justify-self-centertext-center flex flex-row flex-wrap items-center justify-center gap-3">
                                    <button
                                        className="hover:text-dashboard-action text-blue-600"
                                        onClick={() => handleOpenModal(cls)}
                                    >
                                        <PencilIcon className={'h-4 w-4'} />
                                    </button>

                                    <button
                                        className="hover:text-dashboard-action flex flex-row items-center justify-center text-blue-600"
                                        onClick={() => handleOpenAddClientModal(cls)}
                                    >
                                        <PlusIcon className={'h-4 w-4'} />
                                        <p>add client</p>
                                    </button>
                                </div>,
                            ]}
                        />
                    ))}
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>
            <ManageClassBookingModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                bookedClass={bookedClass}
                handleSubmit={() => console.log('hello')}
                setIsOpen={setIsOpen}
            />
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
