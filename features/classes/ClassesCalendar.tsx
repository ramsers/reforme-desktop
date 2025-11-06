'use client'
import { RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '@store/slices/classSlice'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { createBooking, deleteUserBooking } from '@store/slices/bookingSlice'
import CalendarBar from '@components/calendar/CalendarBar'
import CalendarList from '@components/calendar/CalendarList'
import { useRouter, useSearchParams } from 'next/navigation'
import AppRoutes from 'config/appRoutes'
import Button from '@components/button/button'
import SkeletonBlock from '@components/SkeletonBlock/SkeletonBlock'

type ClassesCalendarOwnProps = {}

type ClassesCalendarSliceProps = {}

type ClassesCalendarDispatchProps = {}

type ClassesCalendarProps = ClassesCalendarOwnProps & ClassesCalendarSliceProps & ClassesCalendarDispatchProps

const ClassesCalendar: React.FC<ClassesCalendarProps> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const classes = useSelector((state: RootState) => state.class?.classes)
    const user = useSelector((state: RootState) => state.user)
    dayjs.extend(utc)

    const [selectedDay, setSelectedDay] = useState(dayjs())
    const searchParams = useSearchParams()
    const originalBookingId = searchParams.get('original_booking')

    useEffect(() => {
        dispatch(fetchClasses({ date: selectedDay.format('YYYY-MM-DD') }))
    }, [dispatch, selectedDay])

    const handleCreateBooking = (classId: string) => {
        if (originalBookingId) {
            dispatch(deleteUserBooking(originalBookingId))
        }
        dispatch(createBooking({ clientId: user?.currentUser?.id!, classId: classId }))
    }

    console.log('CLASSES ==========================', classes)

    return (
        <div className="flex w-full flex-col items-center gap-6">
            {!classes || !classes.hasFetched ? (
                <SkeletonBlock className="w-1/2" />
            ) : (
                <>
                    <CalendarBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

                    <CalendarList
                        items={classes.data.results.map((cls) => {
                            const isPast = dayjs(cls.date).isBefore(dayjs(), 'day')

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
                    />
                </>
            )}
        </div>
    )
}

export default ClassesCalendar
