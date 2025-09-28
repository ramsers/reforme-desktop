'use client'
import BookingTable from '@features/booking/BookingTable'
import ClassesTable from '@features/dashboard/classes/ClassesTable'
import { RootState } from '@store/index'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DashboardBookingsPage: React.FC = () => {
    // List of of classes prefiltered to this week.
    // list is like a table with date, class name, instructor, edit
    // filter for date range (with current 7 days already selected)
    // Classes model are going to need a frequency so admin can set i think (may be nice to have)
    const dispatch = useDispatch()
    const classes = useSelector((state: RootState) => state.class?.classes?.results)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const startOfWeek = dayjs().startOf('week').toISOString()
        const endOfWeek = dayjs().endOf('week').toISOString()
        dispatch(fetchClasses({ has_bookings: true, start_date: startOfWeek, end_date: endOfWeek }))
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Bookings</p>
                    <p className="text-sm">View and manage your bookings for each class</p>
                </div>
                {/* <CreateClassButtonModal /> */}
            </div>
            <BookingTable classes={classes} />
        </div>
    )
}

export default DashboardBookingsPage
