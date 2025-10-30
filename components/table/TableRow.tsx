import React from 'react'
import { twMerge } from 'tailwind-merge'

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    onClick?: () => void
}

const TableRow: React.FC<TableRowProps> = ({ children, onClick, className }) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                'flex flex-row items-center border-b p-2.5 text-sm transition-colors hover:bg-gray-50',
                onClick && 'cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    )
}

export default TableRow
