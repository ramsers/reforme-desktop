"use client"
import React, {useEffect} from 'react'
import {Dispatch} from 'redux'
import {useDispatch, useSelector} from "react-redux";
import BookingList from "@features/booking/BookingList";
import {fetchBookings} from "@store/slices/bookingSlice"
import {RootState} from "@store/index";

type BookingsPageOwnProps = {}

type BookingsPageSliceProps = {}

type BookingsPageDispatchProps = {}

type BookingsPageProps = BookingsPageOwnProps &
    BookingsPageSliceProps &
    BookingsPageDispatchProps

const BookingsPage: React.FC<BookingsPageProps> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBookings({}));
    }, [dispatch]);

    const bookings = useSelector((state: RootState) => state.booking.bookings.results);


    return (
        <div>
            <BookingList bookings={bookings}/>
        </div>
    )
}


export default BookingsPage
