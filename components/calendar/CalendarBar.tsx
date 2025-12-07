'use client'

import React, { useEffect, useMemo, useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from '@lib/dayjs'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

type CalendarBarOwnProps = {
    selectedDay: Dayjs
    setSelectedDay: (day: Dayjs) => void
    timezone: string
}

type CalendarBarProps = CalendarBarOwnProps

const CalendarBar: React.FC<CalendarBarProps> = ({ selectedDay, setSelectedDay, timezone }) => {
    const [weekOffset, setWeekOffset] = useState(0)
    const today = useMemo(() => dayjs().tz(timezone), [timezone])

    const weekStart = useMemo(() => today.startOf('week').add(weekOffset, 'week'), [today, weekOffset])
    const weekEnd = useMemo(() => weekStart.add(6, 'day'), [weekStart])

    const days = useMemo(() => Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day')), [weekStart])

    useEffect(() => {
        const nextSelected = weekOffset === 0 ? today : weekStart

        if (!nextSelected.isSame(selectedDay, 'day')) {
            setSelectedDay(nextSelected)
        }
    }, [selectedDay, setSelectedDay, today, weekOffset, weekStart])

    return (
        <>
            <div className="flex items-center items-start justify-between gap-2">
                <button onClick={() => setWeekOffset(weekOffset - 1)}>
                    <ChevronLeftIcon className="text-brown-default h-6 w-6" />
                </button>

                <h2 className="text-lg font-semibold">
                    {weekStart.format('MMM D')} – {weekEnd.format('MMM D')}
                </h2>

                <button onClick={() => setWeekOffset(weekOffset + 1)}>
                    <ChevronRightIcon className="text-brown-default h-6 w-6" />
                </button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {days.map((day) => {
                    const isSelected = day.isSame(selectedDay, 'day')
                    return (
                        <button
                            key={day.format('YYYY-MM-DD')}
                            onClick={() => setSelectedDay(day)}
                            className={`flex w-14 flex-col items-center rounded-xl border px-4 py-2 transition-all ${
                                isSelected
                                    ? 'bg-brown-default border-brown-default text-white'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <div className="text-sm">{day.format('ddd')}</div>
                            <div className="font-semibold">{day.format('D')}</div>
                        </button>
                    )
                })}
            </div>
        </>
    )
}

export default CalendarBar
