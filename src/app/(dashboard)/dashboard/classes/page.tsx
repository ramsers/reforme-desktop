'use client'
import ClassesCalendar from '@features/classes/ClassesCalendar'
import React, { useEffect, useState } from 'react'
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

const DashboardClassesPage: React.FC = () => {
    // List of of classes prefiltered to this week.
    // list is like a table with date, class name, instructor, edit
    // filter for date range (with current 7 days already selected)
    // Classes model are going to need a frequency so admin can set i think (may be nice to have)
    const dispatch = useDispatch()
    const classes = useSelector((state: RootState) => state.class?.classes)
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const startOfWeek = dayjs().startOf('week').toISOString()
        const endOfWeek = dayjs().endOf('week').toISOString()

        dispatch(fetchClasses({ start_date: startOfWeek, end_date: endOfWeek, page: currentPage }))
    }, [currentPage])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Classes</p>
                    <p className="text-sm">View and manage your classes</p>
                </div>
                <CreateClassButtonModal />
            </div>
            <ClassesTable classes={classes} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default DashboardClassesPage
