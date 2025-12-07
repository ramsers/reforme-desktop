'use client'
import { RootState } from '@store/index'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from '@lib/dayjs'
import CalendarBar from '@components/calendar/CalendarBar'
import CalendarList, { CardItem } from '@components/calendar/CalendarList'
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
    const currentUser = useSelector((state: RootState) => state.user.currentUser.data)

    const classes: AsyncResource<ShortPaginatedResponse<Class>> = useSelector(
        (state: RootState) => state.class?.classes
    )

    // ⭐ USE INSTRUCTOR/STUDIO TIMEZONE
    const instructorTimezone = useMemo(() => {
        return currentUser?.account?.timezone?.trim() || 'America/Toronto'
    }, [currentUser?.account?.timezone])

    const [selectedDay, setSelectedDay] = useState(dayjs().tz(instructorTimezone))
    const [page, setPage] = useState(1)

    useEffect(() => {
        setSelectedDay((prev) => dayjs(prev.format('YYYY-MM-DD')).tz(instructorTimezone))
    }, [instructorTimezone])

    const selectedDayRange = useMemo(() => {
        const dayInInstructorTz = selectedDay.tz(instructorTimezone)

        return {
            startDate: dayInInstructorTz.startOf('day').utc().toISOString(),
            endDate: dayInInstructorTz.endOf('day').utc().toISOString(),
        }
    }, [instructorTimezone, selectedDay])

    // Fetch initial page
    useEffect(() => {
        setPage(1)
        dispatch(
            fetchClasses({
                start_date: selectedDayRange.startDate,
                end_date: selectedDayRange.endDate,
                page: 1,
            })
        )
    }, [dispatch, selectedDayRange.endDate, selectedDayRange.startDate])

    // Infinite scroll: Load more pages
    useEffect(() => {
        if (page === 1) return

        dispatch(
            fetchClasses({
                start_date: selectedDayRange.startDate,
                end_date: selectedDayRange.endDate,
                page,
                append: true,
            })
        )
    }, [dispatch, page, selectedDayRange.endDate, selectedDayRange.startDate])

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
                    <CalendarBar
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        timezone={instructorTimezone}
                    />

                    <CalendarList
                        items={classes.data.results.map((cls) => {
                            const classTimezone = cls?.instructor?.account?.timezone || instructorTimezone
                            const classDate = dayjs(cls.date).tz(classTimezone)
                            const isPast = classDate.isBefore(dayjs().tz(classTimezone), 'day')

                            return {
                                id: cls.id,
                                title: cls.title,
                                description: cls.description,
                                instructorName: cls?.instructor?.name ?? '',
                                date: cls.date.toString(),
                                actions: !isPast ? (
                                    <Button
                                        text="View class"
                                        onClick={() => router.push(AppRoutes.classes.detail(cls.id))}
                                    />
                                ) : null,
                            } as CardItem
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
