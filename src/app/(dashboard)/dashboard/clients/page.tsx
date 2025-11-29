'use client'

import React from 'react'
import TableLoader from '@components/Loaders/TableLoader'
import ClientTable from '@features/dashboard/clients/ClientTable'
import CreateClientButtonModal from '@features/dashboard/clients/CreateClientButtonModal'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import { fetchAllClients } from '@store/slices/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DashboardClientsPage = () => {
    const dispatch = useDispatch()
    const clients: AsyncResource<ShortPaginatedResponse<User>> = useSelector((state: RootState) => state.user.clients)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        dispatch(fetchAllClients({ page: currentPage, search: searchQuery }))
    }, [currentPage, searchQuery])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Clients</p>
                    <p className="text-sm">View and manage your clients</p>
                </div>
                <CreateClientButtonModal />
            </div>
            <div className="flex flex-row justify-end gap-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                    }}
                    placeholder="Search by name or email"
                    className="w-64 rounded rounded-lg border bg-white p-2 text-sm"
                />
            </div>
            {!clients.hasFetched && clients.data.results.length === 0 ? (
                <TableLoader />
            ) : (
                <ClientTable clients={clients.data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    )
}

export default DashboardClientsPage
