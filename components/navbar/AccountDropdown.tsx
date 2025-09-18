import {RootState} from '@store/index'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon, ArrowRightEndOnRectangleIcon, ArrowRightIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
    UserCircleIcon
} from '@heroicons/react/24/solid'
import {logout} from "@store/slices/signUpSlice"
import {useRouter} from "next/navigation";
import AppRoutes from "../../config/appRoutes";

type AccountDropdownOwnProps = {}

type AccountDropdownSliceProps = {}

type AccountDropdownDispatchProps = {}

type AccountDropdownProps = AccountDropdownOwnProps &
    AccountDropdownSliceProps &
    AccountDropdownDispatchProps

const AccountDropdown: React.FC<AccountDropdownProps> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    return (
        <Menu>
            <MenuButton className="items-center gap-2 rounded-md hover:bg-brown-default/40">
                <UserCircleIcon className="h-6 w-6" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 p-1 text-main text-sm/6 bg-brown-50 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                <MenuItem>
                    <button onClick={() => router.push(AppRoutes.bookings.list)} className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-main/10">
                        <PencilIcon className="size-4 text-main" />
                        Bookings
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-main/10">
                        <Square2StackIcon className="size-4 text-main" />
                        Duplicate
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-main/10">
                        <ArchiveBoxXMarkIcon className="size-4 text-main" />
                        Archive
                    </button>
                </MenuItem>
                <MenuItem>
                    <button onClick={() => dispatch(logout())} className="group flex px-3 py-1.5 w-full items-center gap-2 data-focus:bg-main/10">
                        <ArrowRightEndOnRectangleIcon className="size-4 text-main" />
                        <p>Logout</p>
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

const mapStateToProps = (store: RootState): AccountDropdownSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): AccountDropdownDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown)
