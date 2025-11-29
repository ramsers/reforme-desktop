'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BookingList from '@features/booking/BookingList'
import { fetchBookings } from '@store/slices/bookingSlice'

const BookingsPage: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBookings({}))
    }, [dispatch])

    return (
        <div>
            <BookingList />
        </div>
    )
}

export default BookingsPage
