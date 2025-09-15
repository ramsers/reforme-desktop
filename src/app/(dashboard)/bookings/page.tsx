"use client"
import React from 'react'
import {Dispatch} from 'redux'

type BookingsPageOwnProps = {}

type BookingsPageSliceProps = {}

type BookingsPageDispatchProps = {}

type BookingsPageProps = BookingsPageOwnProps &
    BookingsPageSliceProps &
    BookingsPageDispatchProps

const BookingsPage: React.FC<BookingsPageProps> = () => {
    return <p>im in bookings</p>
}


export default BookingsPage
