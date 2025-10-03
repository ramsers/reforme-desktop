import React from 'react'

interface PaginationButtonsProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ totalPages, currentPage, onPageChange }) => (
    <div className="flex justify-end gap-2 p-2">
        {Array.from({ length: totalPages }, (_, i) => (
            <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`rounded px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
                {i + 1}
            </button>
        ))}
    </div>
)

export default PaginationButtons
