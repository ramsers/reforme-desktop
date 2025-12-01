import { PencilIcon } from '@heroicons/react/24/solid'
import { User } from '@reformetypes/userTypes'
import dayjs from '@lib/dayjs'
import React, { useState } from 'react'
import CreateEditClientForm from './CreateEditClientForm'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import PaginationButtons from '@components/table/PaginationButtons'
import TableRow from '@components/table/TableRow'
import Button from '@components/button/button'
import { API_PAGESIZE } from 'consts/consts'

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

    const totalPages = Math.ceil(clients.count / API_PAGESIZE)

    return (
        <>
            <TableContainer>
                <TableHeader className="grid grid-cols-12 p-2 md:grid-cols-24">
                    <div className="hidden md:col-span-6 md:block">Created on</div>
                    <div className="col-span-3 md:col-span-6">Name</div>
                    <div className="col-span-3 md:col-span-6 md:block">Email</div>
                    <div className="col-span-3 text-center md:col-span-4">Phone</div>
                    <div className="col-span-3 text-center md:col-span-2 md:text-right">Actions</div>
                </TableHeader>

                {clients?.count > 0 ? (
                    clients.results.map((client) => (
                        <TableRow
                            key={client.id}
                            onClick={() => handleOpenClientModal(client)}
                            className="grid cursor-pointer grid-cols-12 border-b p-2 hover:bg-gray-50 md:grid-cols-24"
                        >
                            <div className="hidden font-bold md:col-span-6 md:block">
                                <p>{dayjs(client.createdAt).format('D MMM YY')}</p>
                            </div>

                            <div className="col-span-3 truncate font-semibold md:col-span-6">{client.name}</div>

                            <div className="col-span-3 truncate font-semibold md:col-span-6 md:block">
                                {client.email}
                            </div>

                            <div className="col-span-3 text-center font-semibold md:col-span-4">
                                {client.phoneNumber || '—'}
                            </div>

                            <div className="col-span-3 flex justify-center md:col-span-2 md:justify-end">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleOpenClientModal(client)
                                    }}
                                    icon={<PencilIcon />}
                                    variant="text"
                                />
                            </div>
                        </TableRow>
                    ))
                ) : (
                    <p className="pt-3 text-center">No clients found</p>
                )}
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>
            <CreateEditClientForm isOpen={isOpen} setIsOpen={setIsOpen} title="Edit client" client={client} />
        </>
    )
}

export default ClientTable
