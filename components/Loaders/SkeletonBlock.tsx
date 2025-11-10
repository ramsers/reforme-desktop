import React from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonBlockProps = {
    className?: string
    rows?: number
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ className = '', rows = 3 }) => {
    return (
        <div className={twMerge('w-full animate-pulse space-y-3', className)}>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="bg-brown-50 h-5 w-full rounded-md p-8" />
            ))}
        </div>
    )
}

export default SkeletonBlock
