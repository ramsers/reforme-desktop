'use client'

import React, { useEffect, useState } from 'react'
import CreateClassButtonModal from '@features/dashboard/classes/CreateClassButtonModal'
import ClassesTable from '@features/dashboard/classes/ClassesTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllInstructors } from '@store/slices/userSlice'
import { RootState } from '@store/index'
import { PlusIcon } from '@heroicons/react/24/solid'
import CreateInstructorButtonModal from '@features/dashboard/instructors/CreateInstructorButtonModal'
import InstructorsTable from '@features/dashboard/instructors/InstructorsTable'

const DashBoardInstructorsPage: React.FC = () => {
    const dispatch = useDispatch()
    const instructors = useSelector((state: RootState) => state.user?.instructors)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        dispatch(fetchAllInstructors({ page: currentPage, search: searchQuery }))
    }, [currentPage, searchQuery])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Instructors</p>
                    <p className="text-sm">View and manage your instructors</p>
                </div>
                <CreateInstructorButtonModal />
            </div>
            <div className="flex flex-row justify-end">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                    }}
                    placeholder="Search by class or instructor"
                    className="w-full rounded rounded-lg border bg-white p-2 text-sm md:w-64"
                />
            </div>

            <InstructorsTable instructors={instructors} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default DashBoardInstructorsPage
