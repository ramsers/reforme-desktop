"use client"
import {XMarkIcon} from "@heroicons/react/24/solid";
import React from "react";
import AppRoutes from "../../config/appRoutes";
import {useRouter} from "next/navigation";

type SideBarProps = {
    open: boolean
    setOpen: (show: boolean) => void
}

const SideBar: React.FC<SideBarProps> = ({open, setOpen}) => {
    const router = useRouter()

    return (
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
                    <XMarkIcon className={"h-6 w-6 text-white"} />
                </button>
            </div>
            <nav className="p-4 space-y-4">
                <button onClick={() => router.push(AppRoutes.dashboard.classes.list)} className="block w-full hover:bg-gray-700 p-2 rounded text-left">
                    Classes
                </button>
                <a href="#"  className="block w-full hover:bg-gray-700 p-2 rounded text-left">
                    Profile
                </a>
                <a href="#"  className="block w-full hover:bg-gray-700 p-2 rounded text-left">
                    Settings
                </a>
                <a href="#"  className="block w-full hover:bg-gray-700 p-2 rounded text-left">
                    Logout
                </a>
            </nav>
        </aside>
    )
}
export default SideBar;
