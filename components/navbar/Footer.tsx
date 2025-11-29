import React from 'react'
import appRoutes from 'config/appRoutes'

const Footer: React.FC = () => {
    return (
        <nav className="bg-main px-3 py-4 md:px-8">
            <div className="flex w-full flex-col items-start justify-between">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="font-heading text-brown-default text-5xl font-semibold tracking-wider whitespace-nowrap">
                        Reformé
                    </span>
                </a>

                <div className="flex flex-col md:flex">
                    <ul className="text-brown-default mt-4 flex flex-col rounded-lg border border-gray-100 font-medium font-semibold md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
                        <li>
                            <a
                                href="/"
                                className="block rounded-sm px-3 py-2 md:bg-transparent md:p-0"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href={appRoutes.classes.list}
                                className="block rounded-sm px-3 py-2 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                            >
                                Classes
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Footer
