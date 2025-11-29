'use client'

import React, { useEffect, useRef } from 'react'
import { formatLocalDateTime } from '../../utils/dateUtils'

export interface CardItem {
    id: string | number
    title: string
    description: string
    instructorName: string | null
    date: string
    actions?: React.ReactNode
}

type CalendarListOwnProps = {
    items: CardItem[]
    emptyMessage?: string
    onLoadMore?: () => void
    hasMore?: boolean
    isLoading?: boolean
}

type CalendarListProps = CalendarListOwnProps

const CalendarList: React.FC<CalendarListProps> = ({ items, onLoadMore, hasMore, isLoading, emptyMessage = '' }) => {
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!onLoadMore || !hasMore) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isLoading) {
                        onLoadMore()
                    }
                })
            },
            { threshold: 0.5 }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [hasMore, isLoading, onLoadMore])

    if (!items || items.length === 0) {
        return <div className="py-10 text-center text-gray-500">{emptyMessage}</div>
    }

    return (
        <div className="flex max-h-[80vh] w-full max-w-2xl flex-col gap-3 overflow-y-auto">
            {items &&
                items?.map((item) => (
                    <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold">{item.title}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                                <span className="text-sm">
                                    {item.instructorName || 'Instructor not assigned'} •{' '}
                                    {formatLocalDateTime(item.date, 'h:mm A')}
                                </span>
                            </div>
                            {item.actions && <div className="flex flex-row gap-2">{item.actions}</div>}
                        </div>
                    </div>
                ))}
            {hasMore && (
                <div ref={sentinelRef} className="flex w-full flex-row justify-center pb-4 text-sm text-gray-500">
                    {isLoading && (
                        <div className="border-t-brown-default h-10 w-10 animate-spin rounded-full border-4 border-gray-300"></div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CalendarList
