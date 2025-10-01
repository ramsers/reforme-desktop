'use client'
import ClientTable from '@features/dashboard/clients/ClientTable'
import CreateClientButtonModal from '@features/dashboard/clients/CreateClientButtonModal'
import { RootState } from '@store/index'
import { fetchAllClients } from '@store/slices/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DashboardClientsPage = () => {
    const dispatch = useDispatch()
    const clients = useSelector((state: RootState) => state.user.clients)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        dispatch(fetchAllClients({ currentPage: currentPage, search: searchQuery }))
    }, [currentPage, searchQuery])

    console.log('Clients:', clients)

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Clients</p>
                    <p className="text-sm">View and manage your clients</p>
                </div>
                {/* <InstructorTableContextProvider>
                    <CreateInstructorButtonModal />
                </InstructorTableContextProvider> */}
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
                    placeholder="Search by clas name or instructor"
                    className="w-64 rounded rounded-lg border bg-white p-2 text-sm"
                />
            </div>
            <ClientTable clients={clients} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default DashboardClientsPage
