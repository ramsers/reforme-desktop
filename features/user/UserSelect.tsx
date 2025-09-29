import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { User } from '@reformetypes/userTypes'
import { Fragment, useState } from 'react'

type UserSelectProps = {
    users: User[]
    selectedUserId: string | null
    onChange: (id: string) => void
}

export default function UserSelect({ users, selectedUserId, onChange }: UserSelectProps) {
    const [query, setQuery] = useState('')

    const filteredUsers =
        query === ''
            ? users
            : users.filter(
                  (user) =>
                      user.name.toLowerCase().includes(query.toLowerCase()) ||
                      user.email.toLowerCase().includes(query.toLowerCase())
              )

    const selectedUser = users.find((u) => u.id === selectedUserId) || null

    return (
        <Combobox value={selectedUser} onChange={(user: User) => onChange(user.id)}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pr-10 pl-3 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(user: User) => user?.name || ''}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search user..."
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredUsers.length === 0 && query !== '' ? (
                            <div className="relative cursor-default px-4 py-2 text-gray-700 select-none">
                                No users found.
                            </div>
                        ) : (
                            filteredUsers.map((user) => (
                                <Combobox.Option
                                    key={user.id}
                                    className={({ active }) =>
                                        `relative cursor-default py-2 pr-4 pl-10 select-none ${
                                            active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={user}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {user.name} <span className="text-gray-400">({user.email})</span>
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? 'text-white' : 'text-blue-600'
                                                    }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}
