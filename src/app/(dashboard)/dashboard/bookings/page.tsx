'use client'
import BookingTable from '@features/booking/BookingTable'
import ClassesTable from '@features/dashboard/classes/ClassesTable'
import { RootState } from '@store/index'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import { Popover } from '@headlessui/react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DashboardBookingsPage: React.FC = () => {
    // List of of classes prefiltered to this week.
    // list is like a table with date, class name, instructor, edit
    // filter for date range (with current 7 days already selected)
    // Classes model are going to need a frequency so admin can set i think (may be nice to have)
    const dispatch = useDispatch()
    const classes = useSelector((state: RootState) => state.class?.classes)
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: dayjs().startOf('week').toDate(),
            endDate: dayjs().endOf('week').toDate(),
            key: 'selection',
        },
    ])

    const handleSelect = (ranges: any) => {
        setDateRange([ranges.selection])
    }

    useEffect(() => {
        const start_date = dateRange[0]?.startDate?.toISOString()
        const end_date = dateRange[0]?.endDate?.toISOString()

        dispatch(fetchClasses({ start_date, end_date, page: currentPage, search: searchQuery }))
    }, [dateRange, currentPage, searchQuery])

    // useEffect(() => {
    //     const startOfWeek = dayjs().startOf('week').toISOString()
    //     const endOfWeek = dayjs().endOf('week').toISOString()

    //     console.log('startOfWeek===================', startOfWeek, endOfWeek)
    //     dispatch(fetchClasses({ has_bookings: true, start_date: startOfWeek, end_date: endOfWeek }))
    // }, [])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Bookings</p>
                    <p className="text-sm">View and manage your bookings for each class</p>
                </div>
                {/* <CreateClassButtonModal /> */}
            </div>
            <div className="flex flex-row flex-wrap justify-end gap-2">
                <Popover className="w-full lg:w-64">
                    <Popover.Button className="w-full rounded-lg border bg-white px-3 py-2 text-left text-sm lg:w-64">
                        {dayjs(dateRange[0].startDate).format('MMM D, YYYY')} –{' '}
                        {dayjs(dateRange[0].endDate).format('MMM D, YYYY')}
                    </Popover.Button>

                    <Popover.Panel transition anchor="bottom">
                        <DateRange
                            editableDateInputs={true}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                        />
                    </Popover.Panel>
                </Popover>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                    }}
                    placeholder="Search by clas name or instructor"
                    className="w-full rounded rounded-lg border bg-white p-2 text-sm lg:w-64"
                />
            </div>
            <BookingTable classes={classes} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default DashboardBookingsPage
