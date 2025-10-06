import { PencilIcon } from '@heroicons/react/24/solid'
import { User } from '@reformetypes/userTypes'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import CreateEditClientForm from './CreateEditClientForm'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import TableContainer from '@components/table/TableContainer'
import TableHeader from '@components/table/TableHeader'
import PaginationButtons from '@components/table/PaginationButtons'
import TableRow from '@components/table/TableRow'

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

    return (
        <>
            <TableContainer>
                <TableHeader
                    columns={[
                        { label: 'Created on', span: 6 },
                        { label: 'Name', span: 6 },
                        { label: 'Email', span: 6 },
                        { label: 'Phone number', span: 4, align: 'center' },
                        { label: '', span: 2 },
                    ]}
                />

                {(clients?.count > 0 &&
                    clients.results.map((client) => (
                        <TableRow
                            key={client.id}
                            spans={[6, 6, 6, 4, 2]}
                            onClick={() => handleOpenClientModal(client)}
                            children={[
                                <div className="font-bold">
                                    <p>{dayjs(client.createdAt).format('D MMM YY')}</p>
                                </div>,
                                <p className="truncate font-semibold">{client.name}</p>,
                                <p className="truncate font-semibold">{client.email}</p>,
                                <p className="truncate text-center font-semibold">{client.phoneNumber}</p>,
                                <button
                                    className="hover:text-dashboard-action text-blue-600"
                                    onClick={() => handleOpenClientModal(client)}
                                >
                                    <PencilIcon className={'h-4 w-4'} />
                                </button>,
                            ]}
                        />
                    ))) ||
                    null}
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </TableContainer>
            <CreateEditClientForm isOpen={isOpen} setIsOpen={setIsOpen} title="Edit client" client={client} />
        </>
    )
}

export default ClientTable
