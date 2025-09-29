'use client'
import ClientTable from '@features/dashboard/clients/ClientTable'
import CreateClientButtonModal from '@features/dashboard/clients/CreateClientButtonModal'
import { RootState } from '@store/index'
import { fetchAllClients } from '@store/slices/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DashboardClientsPage = () => {
    const dispatch = useDispatch()
    const clients = useSelector((state: RootState) => state.user?.clients)

    useEffect(() => {
        dispatch(fetchAllClients())
    }, [])

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
            <ClientTable clients={clients} />
        </div>
    )
}

export default DashboardClientsPage
