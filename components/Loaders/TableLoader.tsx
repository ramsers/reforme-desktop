import React from 'react'

type TableLoaderProps = {
    rows?: number
    columns?: number
}

const TableLoader: React.FC<TableLoaderProps> = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="w-full animate-pulse overflow-hidden rounded-lg border">
            <div className="divide-y divide-gray-100">
                {Array.from({ length: rows }).map((_, rowIdx) => (
                    <div
                        key={rowIdx}
                        className="grid w-full gap-4 p-3"
                        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                    >
                        {Array.from({ length: columns }).map((_, colIdx) => (
                            <div key={colIdx} className="flex items-center">
                                <div className="bg-dashboard-action h-4 w-full rounded" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TableLoader
