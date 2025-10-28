import { RootState } from '@store/index'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon,
    ArrowRightEndOnRectangleIcon,
    ArrowRightIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
    UserCircleIcon,
    UserIcon,
} from '@heroicons/react/24/solid'
import { logout } from '@store/slices/signUpSlice'
import { useRouter } from 'next/navigation'
import AppRoutes from '../../config/appRoutes'

type AccountDropdownOwnProps = {}

type AccountDropdownSliceProps = {}

type AccountDropdownDispatchProps = {}

type AccountDropdownProps = AccountDropdownOwnProps & AccountDropdownSliceProps & AccountDropdownDispatchProps

const AccountDropdown: React.FC<AccountDropdownProps> = () => {
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

const mapStateToProps = (store: RootState): AccountDropdownSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): AccountDropdownDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown)
