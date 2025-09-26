import Modal from '@components/modal/Modal'
import { PencilIcon } from '@heroicons/react/24/solid'
import { Booking } from '@reformetypes/bookingTypes'
import { Class } from '@reformetypes/classTypes'
import dayjs from 'dayjs'
import React, { useState } from 'react'

type BookingTableProps = {
    classes: Class[]
}

const BookingTable: React.FC<BookingTableProps> = ({ classes }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
            {/*{Table header}*/}
            <div className="grid grid-cols-24 border-b text-sm font-bold text-gray-600">
                <p className="col-span-5 p-2">Date</p>
                <p className="col-span-5 p-2">Class</p>
                <p className="col-span-6 p-2">Instructor</p>
                <p className="col-span-4 p-2 text-center">Booked/Capacity</p>
                <p className="col-span-4 p-2 text-center"></p>
            </div>
            {/*/!*{Table body}*!/*/}

            {classes?.map((cls) => (
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
                    <div className="col-span-4 p-2 text-center">
                        <button className="hover:text-dashboard-action text-blue-600" onClick={() => setIsOpen(true)}>
                            <PencilIcon className={'h-4 w-4'} />
                        </button>
                    </div>
                </div>
            ))}
            {/* isOpen: boolean
              onClose: () => void
              title: string
              content: React.ReactNode
              confirmText?: string
              onConfirm?: () => void */}
            <Modal
                content={<div className="p-5">Modal Content Here</div>}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="hello"
            />
            {/* <CreateClassForm title={'Edit class'} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </div>
    )
}

export default BookingTable
