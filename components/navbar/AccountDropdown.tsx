import React from 'react'
import { useDispatch } from 'react-redux'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon, PencilIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import { logout } from '@store/slices/authSlice'
import { useRouter } from 'next/navigation'
import AppRoutes from '../../config/appRoutes'

const AccountDropdown: React.FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    return (
        <Menu>
            <MenuButton className="hover:bg-brown-default/40 items-center gap-2 rounded-md">
                <UserCircleIcon className="h-6 w-6" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="text-main bg-brown-50 w-52 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <button
                        onClick={() => router.push(AppRoutes.bookings.list)}
                        className="group data-focus:bg-main/10 flex w-full items-center gap-2 px-3 py-1.5"
                    >
                        <PencilIcon className="text-main size-4" />
                        Bookings
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={() => router.push(AppRoutes.account)}
                        className="group data-focus:bg-main/10 flex w-full items-center gap-2 px-3 py-1.5"
                    >
                        <UserIcon className="text-main size-4" />
                        Account
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        onClick={() => dispatch(logout())}
                        className="group data-focus:bg-main/10 flex w-full items-center gap-2 px-3 py-1.5"
                    >
                        <ArrowRightEndOnRectangleIcon className="text-main size-4" />
                        <p>Logout</p>
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default AccountDropdown
