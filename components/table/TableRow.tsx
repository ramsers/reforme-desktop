import { on } from 'events'
import React from 'react'

const TableRow: React.FC<{ spans: number[]; children: React.ReactNode[]; onClick?: (arg?: any) => void }> = ({
    spans,
    children,
    onClick,
}) => (
    <div
        className={`hover:bg-gray-20 flex grid ${onClick && 'cursor-pointer'} grid-cols-24 flex-row items-center border-b p-2 text-sm`}
        onClick={onClick}
    >
        {children.map((child, i) => (
            <div key={i} className={`col-span-${spans[i]} p-2`}>
                {child}
            </div>
        ))}
    </div>
)
export default TableRow
