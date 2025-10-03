import React from 'react'

const TableRow: React.FC<{ spans: number[]; children: React.ReactNode[]; onClick?: (arg?: any) => void }> = ({
    spans,
    children,
}) => (
    <div className="hover:bg-gray-20 flex grid cursor-pointer grid-cols-24 flex-row items-center border-b p-2 text-sm">
        {children.map((child, i) => (
            <div key={i} className={`col-span-${spans[i]} p-2`}>
                {child}
            </div>
        ))}
    </div>
)
export default TableRow
