'use client'
import { RootState } from '@store/index'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from '@lib/dayjs'
import utc from 'dayjs/plugin/utc'
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
    // dayjs.extend(utc)

    const guessedTimezone = useMemo(() => dayjs.tz.guess(), [])
    const userTimezone = useMemo(() => {
        const timezoneFromUser = currentUser?.account?.timezone?.trim()
        const userTzIsValid = timezoneFromUser && Boolean(dayjs.tz.zone(timezoneFromUser))

        if (userTzIsValid) {
            return timezoneFromUser as string
        }

        return guessedTimezone
    }, [currentUser?.account?.timezone, guessedTimezone])

    const [selectedDay, setSelectedDay] = useState(() => dayjs().tz(userTimezone))

    const [page, setPage] = useState(1)

    useEffect(() => {
        setSelectedDay((previousDay) => dayjs(previousDay.format('YYYY-MM-DD')).tz(userTimezone))
    }, [userTimezone])

    const getDateRangeForSelectedDay = useCallback(
        (date: typeof selectedDay) => {
            const dayInUserTz = date.tz(userTimezone)

            return {
                startDate: dayInUserTz.startOf('day').utc().toISOString(),
                endDate: dayInUserTz.endOf('day').utc().toISOString(),
            }
        },
        [userTimezone]
    )

    useEffect(() => {
        setPage(1)
        const { startDate, endDate } = getDateRangeForSelectedDay(selectedDay)

        dispatch(fetchClasses({ start_date: startDate, end_date: endDate, page: 1 }))
    }, [dispatch, getDateRangeForSelectedDay, selectedDay])

    useEffect(() => {
        if (page === 1) return
        if (!classes?.data?.next || classes.fetching) return
        const { startDate, endDate } = getDateRangeForSelectedDay(selectedDay)

        dispatch(fetchClasses({ start_date: startDate, end_date: endDate, page, append: true }))
    }, [classes?.data?.next, classes.fetching, dispatch, getDateRangeForSelectedDay, page, selectedDay])

    const handleLoadMore = useCallback(() => {
        if (!classes?.data?.next || classes.fetching) return

        setPage((prev) => prev + 1)
    }, [classes?.data?.next, classes.fetching, dispatch, getDateRangeForSelectedDay, page, selectedDay])

    return (
        <div className="flex w-full flex-col items-center gap-6">
            {!classes || !classes.hasFetched ? (
                <SkeletonBlock className="w-1/2" />
            ) : (
                <>
                    <CalendarBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} timezone={userTimezone} />

                    <CalendarList
                        items={classes.data.results.map((cls) => {
                            const classDate = dayjs(cls.date).tz(userTimezone)
                            const isPast = classDate.isBefore(dayjs().tz(userTimezone), 'day')

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
