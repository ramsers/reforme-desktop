import Modal from '@components/modal/Modal'
import SlidingModal from '@components/slidingModal/SlidingModal'
import { Class } from '@reformetypes/classTypes'
import React from 'react'
import BookerModalRow from './BookerModalRow'

type ManageClassBookingModalProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    onClose: () => void
    bookedClass: Class | null
    handleSubmit: () => void
}

const ManageClassBookingModal: React.FC<ManageClassBookingModalProps> = ({
    isOpen,
    onClose,
    bookedClass,
    setIsOpen,
    handleSubmit,
}) => {
    console.log('TESTO ==============', bookedClass)
    //                 )
    return (
        <SlidingModal
            title={'Manage Bookings'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={'Save'}
            onClick={handleSubmit}
            onClose={() => {
                setIsOpen(false)
            }}
        >
            <>
                {bookedClass?.bookings.map((booking) => {
                    return <BookerModalRow booking={booking} bookedClassId={bookedClass.id} />
                })}
            </>
        </SlidingModal>
    )
}

export default ManageClassBookingModal
