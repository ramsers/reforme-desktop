'use client'
import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { use } from 'react'
import AppRoutes from '../../config/appRoutes'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '@store/slices/signUpSlice'

type SideBarProps = {
    open: boolean
    setOpen: (show: boolean) => void
}

const SideBar: React.FC<SideBarProps> = ({ open, setOpen }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = () => {
        // Implement logout functionality here
        dispatch(logout())
        router.push(AppRoutes.home)
        console.log('Logging out...')
    }

    return (
        <aside
            className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} `}
        >
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <button className="text-gray-300 hover:text-white lg:hidden" onClick={() => setOpen(false)}>
                    <XMarkIcon className={'h-6 w-6 text-white'} />
                </button>
            </div>
            <nav className="space-y-4 p-4">
                <button
                    onClick={() => router.push(AppRoutes.dashboard.classes.list)}
                    className="block w-full rounded p-2 text-left hover:bg-gray-700"
                >
                    Classes
                </button>
                <button
                    onClick={() => router.push(AppRoutes.dashboard.instructors.list)}
                    className="block w-full rounded p-2 text-left hover:bg-gray-700"
                >
                    Instructors
                </button>
                <button
                    onClick={() => router.push(AppRoutes.dashboard.bookings.list)}
                    className="block w-full rounded p-2 text-left hover:bg-gray-700"
                >
                    Bookings
                </button>
                <button
                    onClick={() => router.push(AppRoutes.dashboard.clients.list)}
                    className="block w-full rounded p-2 text-left hover:bg-gray-700"
                >
                    Clients
                </button>
                <a href="#" className="block w-full rounded p-2 text-left hover:bg-gray-700">
                    Settings
                </a>
                <button onClick={handleLogout} className="block w-full rounded p-2 text-left hover:bg-gray-700">
                    Logout
                </button>
            </nav>
        </aside>
    )
}
export default SideBar
