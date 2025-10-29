import React from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                // Only handle styling, not grid structure
                'border-b bg-gray-50 text-sm font-semibold text-gray-700',
                className
            )}
        >
            {children}
        </div>
    )
}

export default TableHeader
