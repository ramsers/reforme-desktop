"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <button
                        className="lg:hidden text-gray-300 hover:text-white"
                        onClick={() => setOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-4">
                    <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                        Home
                    </a>
                    <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                        Profile
                    </a>
                    <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                        Settings
                    </a>
                    <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                        Logout
                    </a>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 bg-gray-50 overflow-y-auto">
                {/* Top bar (mobile only) */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b">
                    <button onClick={() => setOpen(true)} className="text-gray-700">
                        <Menu size={28} />
                    </button>
                    <h1 className="text-lg font-semibold">My App</h1>
                </div>

                <div className="p-6">
                    <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
                    <p className="mt-4 text-gray-600">
                        Your main content goes here. Resize the window to see how the sidebar behaves.
                    </p>
                </div>
            </main>
        </div>
    );
}
