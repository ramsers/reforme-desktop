import { PencilIcon } from '@heroicons/react/24/solid'
import { User } from '@reformetypes/userTypes'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import CreateEditClientForm from './CreateEditClientForm'

type ClientTableProps = {
    clients: User[]
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [client, setClient] = useState<User | null>(null)

    const handleOpenClientModal = (client: User) => {
        setClient(client)
        setIsOpen(true)
    }

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

            {clients?.map((client) => (
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
            ))}
            <CreateEditClientForm isOpen={isOpen} setIsOpen={setIsOpen} title="Edit client" client={client} />
        </div>
    )
}

export default ClientTable
