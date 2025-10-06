'use client'

import { RootState } from '@store/store'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import dayjs from 'dayjs'

interface CardItem {
    id: string | number
    title: string
    description: string
    instructorName: string
    date: string
    actions?: React.ReactNode
}

type CalendarListOwnProps = {
    items: CardItem[]
    emptyMessage?: string
}

type CalendarListSliceProps = {}

type CalendarListDispatchProps = {}

type CalendarListProps = CalendarListOwnProps & CalendarListSliceProps & CalendarListDispatchProps

const CalendarList: React.FC<CalendarListProps> = ({ items, emptyMessage = '' }) => {
    if (!items || items.length === 0) {
        return <div className="py-10 text-center text-gray-500">{emptyMessage}</div>
    }

    console.log('   ITEMS ==============', items)

    return (
        <div className="flex w-full max-w-2xl flex-col gap-3">
            {items &&
                items?.map((item) => (
                    <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold">{item.title}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                                <span className="text-sm">
                                    {item.instructorName || 'Instructor not assigned'} •{' '}
                                    {dayjs(item.date).format('h:mm A')}
                                </span>
                            </div>
                            {item.actions && <div className="flex flex-row gap-2">{item.actions}</div>}
                        </div>
                    </div>
                ))}
        </div>
    )
}

const mapStateToProps = (store: RootState): CalendarListSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): CalendarListDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarList)
