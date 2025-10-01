'use client'
import ClassesCalendar from '@features/classes/ClassesCalendar'
import React, { useEffect, useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import ClassesTable from '@features/dashboard/classes/ClassesTable'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { fetchClasses } from '@store/slices/classSlice'
import SlidingModal from '@components/slidingModal/SlidingModal'
import CreateClassForm from '@features/dashboard/classes/CreateEditClassForm'
import CreateClassButtonModal from '@features/dashboard/classes/CreateClassButtonModal'
import dayjs from 'dayjs'
import page from 'src/app/(authentication)/authenticate/login/page'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Popover } from '@headlessui/react'

const DashboardClassesPage: React.FC = () => {
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

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Classes</p>
                    <p className="text-sm">View and manage your classes</p>
                </div>
                <CreateClassButtonModal />
            </div>
            <div className="flex flex-row justify-end gap-2">
                <Popover>
                    <Popover.Button className="w-64 rounded-lg border bg-white px-3 py-2 text-left text-sm">
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
                    className="w-64 rounded rounded-lg border bg-white p-2 text-sm"
                />
            </div>
            <ClassesTable classes={classes} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default DashboardClassesPage
