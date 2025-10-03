import React from 'react'

const TableContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="border-dashboard-action rounded-lg border bg-white shadow-md">{children}</div>
)
export default TableContainer
