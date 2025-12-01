'use client'
import BookingTable from '@features/booking/BookingTable'
import { RootState } from '@store/index'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from '@lib/dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateRange, Range } from 'react-date-range'
import { Popover } from '@headlessui/react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { Class } from '@reformetypes/classTypes'
import TableLoader from '@components/Loaders/TableLoader'
import Button from '@components/button/button'
import React from 'react'

const DashboardBookingsPage: React.FC = () => {
    const dispatch = useDispatch()
    const classes: AsyncResource<ShortPaginatedResponse<Class>> = useSelector(
        (state: RootState) => state.class?.classes
    )
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const getCurrentWeekRange = (): Range => ({
        startDate: dayjs().startOf('week').toDate(),
        endDate: dayjs().endOf('week').toDate(),
        key: 'selection',
    })

    const [dateRange, setDateRange] = useState<Range[]>([getCurrentWeekRange()])

    const handleSelect = (ranges: any) => {
        setDateRange([ranges.selection])
        setCurrentPage(1)
    }

    useEffect(() => {
        const start_date = dateRange[0]?.startDate?.toISOString()
        const end_date = dateRange[0]?.endDate?.toISOString()

        dispatch(fetchClasses({ start_date, end_date, page: currentPage, search: searchQuery }))
    }, [dateRange, currentPage, searchQuery])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Bookings</p>
                    <p className="text-sm">View and manage your bookings for each class</p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-end gap-2">
                <Popover className="w-full lg:w-64">
                    <Popover.Button className="w-full rounded-lg border bg-white px-3 py-2 text-left text-sm lg:w-64">
                        {dayjs(dateRange[0].startDate).format('MMM D, YYYY')} –{' '}
                        {dayjs(dateRange[0].endDate).format('MMM D, YYYY')}
                    </Popover.Button>

                    <Popover.Panel transition anchor="bottom">
                        <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-md">
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleSelect}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                            />
                            <Button
                                onClick={() => {
                                    setDateRange([getCurrentWeekRange()])
                                    setCurrentPage(1)
                                }}
                                text="Clear"
                                variant="dashboard"
                            />
                        </div>
                    </Popover.Panel>
                </Popover>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                    }}
                    placeholder="Search by class name or instructor"
                    className="w-full rounded rounded-lg border bg-white p-2 text-sm lg:w-64"
                />
            </div>
            {!classes.hasFetched && classes.data.results.length === 0 ? (
                <TableLoader />
            ) : (
                <BookingTable classes={classes.data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    )
}

export default DashboardBookingsPage
