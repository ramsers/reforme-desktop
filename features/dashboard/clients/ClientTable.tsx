import { PencilIcon } from '@heroicons/react/24/solid'
import { User } from '@reformetypes/userTypes'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import CreateEditClientForm from './CreateEditClientForm'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'

type ClientTableProps = {
    clients: ShortPaginatedResponse<User>
    setCurrentPage: (page: number) => void
    currentPage: number
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, setCurrentPage, currentPage }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [client, setClient] = useState<User | null>(null)

    const handleOpenClientModal = (client: User) => {
        setClient(client)
        setIsOpen(true)
    }

    const pageSize = 10
    const totalPages = Math.ceil(clients.count / pageSize)

    console.log('CLIENTS IN TABLE =============', clients)
    return (
        <div className="border-dashboard-action rounded-lg border bg-white p-5 shadow-md">
            {/*{Table header}*/}
            <div className="grid grid-cols-24 border-b text-sm font-semibold text-gray-600">
                <p className="col-span-6 p-2">Created on</p>
                <p className="col-span-8 p-2">Name</p>
                <p className="col-span-4 p-2">Email</p>
                <p className="col-span-4 p-2 text-center">Phone number</p>
                <p className="col-span-2 p-2" />
            </div>
            {/*/!*{Table body}*!/*/}

            {(clients?.count > 0 &&
                clients.results.map((client) => (
                    <div key={client.id} className="flex grid grid-cols-24 flex-row items-center border-b text-sm">
                        <div className="col-span-6 p-2">
                            <div>
                                <p>{dayjs(client.createdAt).format('D MMM YY')}</p>
                            </div>
                        </div>
                        <div className="col-span-8 p-2">
                            <p className="font-semibold">{client.name}</p>
                        </div>
                        <div className="col-span-4 p-2">
                            <p className="font-semibold">{client.email}</p>
                        </div>
                        <div className="col-span-4 p-2 text-center">
                            <p className="font-semibold">{client.phoneNumber}</p>
                        </div>
                        <div className="col-span-2 p-2 text-center">
                            <button
                                className="hover:text-dashboard-action text-blue-600"
                                onClick={() => handleOpenClientModal(client)}
                            >
                                <PencilIcon className={'h-4 w-4'} />
                            </button>
                        </div>
                    </div>
                ))) ||
                null}
            <CreateEditClientForm isOpen={isOpen} setIsOpen={setIsOpen} title="Edit client" client={client} />

            <div className="mt-4 flex justify-end gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`rounded px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ClientTable
