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
        <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
            <div className="grid grid-cols-24 border-b text-sm font-bold text-gray-600">
                <p className="col-span-5 p-2">Date</p>
                <p className="col-span-5 p-2">Class</p>
                <p className="col-span-6 p-2">Instructor</p>
                <p className="col-span-4 p-2 text-center">Booked/Capacity</p>
                <p className="col-span-4 p-2 text-center" />
            </div>

            {classes.count > 0 &&
                classes?.results.map((cls) => (
                    <div key={cls.id} className="flex grid grid-cols-24 flex-row items-center border-b text-sm">
                        <div className="col-span-5 p-2">
                            <p>{dayjs(cls.date).format('D MMM')}</p>
                        </div>
                        <div className="col-span-5 p-2">
                            <p className="font-semibold">{cls.title}</p>
                        </div>
                        <div className="col-span-6 p-2">
                            <p className="font-semibold">{cls.instructor?.name}</p>
                        </div>
                        <div className="col-span-4 p-2 text-center">
                            <p>{`${cls.bookingsCount}/${cls.size}`}</p>
                        </div>
                        <div className="col-span-4 flex flex-row items-center justify-center gap-3 p-2 text-center">
                            <button
                                className="hover:text-dashboard-action text-blue-600"
                                onClick={() => handleOpenModal(cls)}
                            >
                                <PencilIcon className={'h-4 w-4'} />
                            </button>

                            <button
                                className="hover:text-dashboard-action flex flex-row items-center justify-center gap-1 text-blue-600"
                                onClick={() => handleOpenAddClientModal(cls)}
                            >
                                <PlusIcon className={'h-4 w-4'} />
                                <p>add client</p>
                            </button>
                        </div>
                    </div>
                ))}
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

export default BookingTable
