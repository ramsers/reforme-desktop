'use client'

import React from 'react'
import { useState } from 'react'

const DashboardLayout: React.FC = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex h-screen">
            <aside
                className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} `}
            >
                <div className="flex items-center justify-between border-b border-gray-700 p-4">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <button className="text-gray-300 hover:text-white lg:hidden" onClick={() => setOpen(false)}>
                        close
                    </button>
                </div>
                <nav className="space-y-4 p-4">
                    <a href="#" className="block rounded p-2 hover:bg-gray-700">
                        Home
                    </a>
                    <a href="#" className="block rounded p-2 hover:bg-gray-700">
                        Profile
                    </a>
                    <a href="#" className="block rounded p-2 hover:bg-gray-700">
                        Settings
                    </a>
                    <a href="#" className="block rounded p-2 hover:bg-gray-700">
                        Logout
                    </a>
                </nav>
            </aside>

            {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
        </div>
    )
}

export default DashboardLayout
