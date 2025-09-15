import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'

type MobileNavBarOwnProps = {}

type MobileNavBarSliceProps = {}

type MobileNavBarDispatchProps = {}

type MobileNavBarProps = MobileNavBarOwnProps & MobileNavBarSliceProps & MobileNavBarDispatchProps

const MobileNavBar: React.FC<MobileNavBarProps> = () => {
    return (
        <Menu>
            <MenuButton>
                <Bars3Icon className="text-brown-default h-6 w-6" />
            </MenuButton>
            <MenuItems anchor={'bottom'} as={'div'} className="text-brown-default bg-main z-100 mt-6 w-full">
                <MenuItem>
                    <a href="#" className="block rounded-sm px-3 py-2 md:bg-transparent md:p-0" aria-current="page">
                        Home
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block rounded-sm px-3 py-2 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    >
                        About
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block rounded-sm px-3 py-2 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    >
                        Classes
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        className="block rounded-sm px-3 py-2 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                        href="/settings"
                    >
                        Settings
                    </a>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default MobileNavBar
