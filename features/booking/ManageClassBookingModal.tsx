import SlidingModal from '@components/slidingModal/SlidingModal'
import { Class } from '@reformetypes/classTypes'
import React from 'react'
import BookerModalRow from './BookerModalRow'

type ManageClassBookingModalProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    bookedClass: Class | null
}

const ManageClassBookingModal: React.FC<ManageClassBookingModalProps> = ({ isOpen, bookedClass, setIsOpen }) => {
    return (
        <SlidingModal
            title={'Manage Bookings'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={'Save'}
            onClose={() => {
                setIsOpen(false)
            }}
        >
            <>
                {bookedClass?.bookings.map((booking) => {
                    return (
                        <BookerModalRow
                            key={booking.id}
                            booking={booking}
                            bookedClassId={bookedClass.id}
                            setIsOpen={setIsOpen}
                        />
                    )
                })}
            </>
        </SlidingModal>
    )
}

export default ManageClassBookingModal
