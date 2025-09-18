"use client"
import React from 'react'
import {Dispatch} from 'redux'
import {useDispatch} from "react-redux";
import BookingCalendar from "@features/BookingCalendar";
import {fetchBookings} from "@store/slices/bookingSlice"

type BookingsPageOwnProps = {}

type BookingsPageSliceProps = {}

type BookingsPageDispatchProps = {}

type BookingsPageProps = BookingsPageOwnProps &
    BookingsPageSliceProps &
    BookingsPageDispatchProps

const BookingsPage: React.FC<BookingsPageProps> = () => {
    const dispatch = useDispatch()


    return (
        <div>
            <BookingCalendar />
        </div>
    )
}


export default BookingsPage
