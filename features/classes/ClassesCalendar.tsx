'use client'
import { RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchClasses, removeClassBooking } from '@store/slices/classSlice'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import classSlice from '@store/slices/classSlice'
import { Class } from '@reformetypes/classTypes'
import { createBooking, deleteUserBooking } from '@store/slices/bookingSlice'
import CalendarBar from '@components/calendar/CalendarBar'
import CalendarList from '@components/calendar/CalendarList'
import { useRouter, useSearchParams } from 'next/navigation'
import AppRoutes from 'config/appRoutes'
import Button from '@components/button/button'

type ClassesCalendarOwnProps = {}

type ClassesCalendarSliceProps = {}

type ClassesCalendarDispatchProps = {}

type ClassesCalendarProps = ClassesCalendarOwnProps & ClassesCalendarSliceProps & ClassesCalendarDispatchProps

const ClassesCalendar: React.FC<ClassesCalendarProps> = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const classes = useSelector((state: RootState) => state.class?.classes?.results)
    const user = useSelector((state: RootState) => state.user)
    // console.log('classes ==============', classes)
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

    // console.log('YO P =====================', classes)

    return (
        <div className="flex w-full flex-col items-center gap-6">
            <CalendarBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

            <CalendarList
                items={classes.map((cls) => {
                    return {
                        id: cls.id,
                        title: cls.title,
                        description: cls.description,
                        instructorName: cls?.instructor?.name,
                        date: cls.date,
                        actions: (
                            <Button text={'View class'} onClick={() => router.push(AppRoutes.classes.detail(cls.id))} />
                        ),
                    }
                })}
                emptyMessage="No classes scheduled for this day"
            />
        </div>
    )
}

const mapStateToProps = (store: RootState): ClassesCalendarSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): ClassesCalendarDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ClassesCalendar)
