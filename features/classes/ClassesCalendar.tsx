'use client'
import { RootState } from '@store/index'
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import CalendarBar from '@components/calendar/CalendarBar'
import CalendarList from '@components/calendar/CalendarList'
import { useRouter } from 'next/navigation'
import AppRoutes from 'config/appRoutes'
import Button from '@components/button/button'
import SkeletonBlock from '@components/Loaders/SkeletonBlock'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { Class } from '@reformetypes/classTypes'

const ClassesCalendar: React.FC = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const classes: AsyncResource<ShortPaginatedResponse<Class>> = useSelector(
        (state: RootState) => state.class?.classes
    )
    dayjs.extend(utc)

    const [selectedDay, setSelectedDay] = useState(dayjs())
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
        dispatch(fetchClasses({ date: selectedDay.format('YYYY-MM-DD'), page: 1 }))
    }, [dispatch, selectedDay])

    useEffect(() => {
        if (page === 1) return
        if (!classes?.data?.next || classes.fetching) return

        dispatch(fetchClasses({ date: selectedDay.format('YYYY-MM-DD'), page, append: true }))
    }, [classes?.data?.next, classes.fetching, dispatch, page, selectedDay])

    const handleLoadMore = useCallback(() => {
        if (!classes?.data?.next || classes.fetching) return

        setPage((prev) => prev + 1)
    }, [classes?.data?.next, classes.fetching])

    return (
        <div className="flex w-full flex-col items-center gap-6">
            {!classes || !classes.hasFetched ? (
                <SkeletonBlock className="w-1/2" />
            ) : (
                <>
                    <CalendarBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

                    <CalendarList
                        items={classes.data.results.map((cls) => {
                            const classDate = dayjs(cls.date).local()
                            const isPast = classDate.isBefore(dayjs(), 'day')

                            return {
                                id: cls.id,
                                title: cls.title,
                                description: cls.description,
                                instructorName: cls?.instructor?.name,
                                date: cls.date,
                                actions: !isPast ? (
                                    <Button
                                        text="View class"
                                        onClick={() => router.push(AppRoutes.classes.detail(cls.id))}
                                    />
                                ) : null,
                            }
                        })}
                        emptyMessage="No classes scheduled for this day"
                        hasMore={Boolean(classes.data.next)}
                        isLoading={classes.fetching}
                        onLoadMore={handleLoadMore}
                    />
                </>
            )}
        </div>
    )
}

export default ClassesCalendar
