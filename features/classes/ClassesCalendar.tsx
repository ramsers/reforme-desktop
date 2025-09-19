"use client"
import {RootState} from '@store/index'
import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from 'redux'
import {fetchClasses} from "@store/slices/classSlice"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import classSlice from "@store/slices/classSlice";
import {Class} from "@reformetypes/classTypes";
import {createBooking} from "@store/slices/bookingSlice"
import CalendarBar from "@components/calendar/CalendarBar";
import CalendarList from "@components/calendar/CalendarList";
import {useSearchParams} from "next/navigation";
import {deleteBooking} from "@api/booking";


type ClassesCalendarOwnProps = {}

type ClassesCalendarSliceProps = {}

type ClassesCalendarDispatchProps = {}

type ClassesCalendarProps = ClassesCalendarOwnProps &
    ClassesCalendarSliceProps &
    ClassesCalendarDispatchProps

const ClassesCalendar: React.FC<ClassesCalendarProps> = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state: RootState) => state.class?.classes?.results);
    const user = useSelector((state: RootState) => state.user);
    console.log('classes ==============', classes)
    dayjs.extend(utc);

    const [selectedDay, setSelectedDay] = useState(dayjs());
    const searchParams = useSearchParams();
    const originalBookingId = searchParams.get("original_booking");

    useEffect(() => {
        dispatch(fetchClasses({ date: selectedDay.format("YYYY-MM-DD") }));
    }, [dispatch, selectedDay]);

    const handleCreateBooking = (classId: string) => {
        if (originalBookingId) {
            dispatch(deleteBooking({ bookingId: originalBookingId }));
        }
        dispatch(createBooking({ clientId: user.id, classId: classId }))
    }

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <CalendarBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

            <CalendarList
                items={classes.map(cls => ({
                    id: cls.id,
                    title: cls.title,
                    description: cls.description,
                    instructorName: cls.instructor.name,
                    date: cls.date,
                    actions: user?.name ? (
                        <button
                            onClick={() => handleCreateBooking(cls.id)}
                            className="hover:bg-gray-10 transition-colors hover:text-brown-default bg-brown-default font-semibold text-main rounded-lg px-3 py-1"
                        >
                            Book now
                        </button>
                    ) : null
                }))}
                emptyMessage="No classes scheduled for this day"
            />
        </div>
    )
}

const mapStateToProps = (store: RootState): ClassesCalendarSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): ClassesCalendarDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(ClassesCalendar)
