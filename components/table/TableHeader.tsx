import React from 'react'

interface Column {
    label: string
    span: number // grid col span
    align?: 'left' | 'center' | 'right'
}

const TableHeader: React.FC<{ columns: Column[] }> = ({ columns }) => (
    <div className="grid grid-cols-24 border-b p-2 text-sm font-semibold text-gray-600">
        {columns.map((col, i) => (
            <p key={i} className={`col-span-${col.span} p-2 ${col.align === 'center' ? 'text-center' : ''}`}>
                {col.label}
            </p>
        ))}
    </div>
)
export default TableHeader
