'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllInstructors } from '@store/slices/userSlice'
import { RootState } from '@store/index'
import CreateInstructorButtonModal from '@features/dashboard/instructors/CreateInstructorButtonModal'
import InstructorsTable from '@features/dashboard/instructors/InstructorsTable'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { User } from '@reformetypes/userTypes'
import TableLoader from '@components/Loaders/TableLoader'
import SearchInput from '@components/search/SearchInput'

const DashBoardInstructorsPage: React.FC = () => {
    const dispatch = useDispatch()
    const instructors: AsyncResource<ShortPaginatedResponse<User>> = useSelector(
        (state: RootState) => state.user?.instructors
    )
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
                <SearchInput
                    placeholder="Search by name or email"
                    onDebouncedChange={(value) => {
                        setSearchQuery(value)
                        setCurrentPage(1)
                    }}
                    className="lg:w-64"
                />
            </div>

            {instructors.fetching ? (
                <TableLoader />
            ) : (
                <InstructorsTable
                    instructors={instructors.data}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}

export default DashBoardInstructorsPage
