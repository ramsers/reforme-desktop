import {RootState} from '@store/index'
import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from 'redux'
import {fetchClasses} from "@store/slices/classSlice"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import classSlice from "@store/slices/classSlice";
import {Class} from "@reformetypes/classTypes";


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

    // current week (today + next 6 days)
    const [days, setDays] = useState(
        Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day"))
    );

    // selected day defaults to today
    const [selectedDay, setSelectedDay] = useState(dayjs());

    useEffect(() => {
        // whenever selectedDay changes, fetch classes
        dispatch(fetchClasses({ date: selectedDay.format("YYYY-MM-DD") }));
    }, [dispatch, selectedDay]);

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <div className="flex gap-4 justify-center">
                {days.map((day) => {
                    const isSelected = day.isSame(selectedDay, "day");
                    return (
                        <button
                            key={day.format("YYYY-MM-DD")}
                            onClick={() => setSelectedDay(day)}
                            className={`px-4 py-2 rounded-xl border transition-all ${
                                isSelected
                                    ? "bg-brown-default text-white border-brown-default"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            <div className="text-sm">{day.format("ddd")}</div>
                            <div className="font-semibold">{day.format("D")}</div>
                        </button>
                    );
                })}
            </div>

            {/* Class list */}
            <div className="w-full max-w-2xl flex flex-col gap-3">
                {classes && classes.length > 0 ? (
                    classes.map((cls: Class) => (
                        <div
                            key={cls.id}
                            className="p-4 rounded-xl shadow bg-white border border-gray-200"
                        >
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="text-lg font-bold">{cls.title}</div>
                                    <div className="text-sm text-gray-600">{cls.description}</div>
                                    <span className="text-sm">{cls.instructor.name} • {dayjs(cls.date).format("h:mm A")}</span>
                                </div>

                                {
                                    user?.name && <button className="min-w-32 bg-brown-default font-semibold text-main rounded-xl px-2 py-1">
                                        Book now
                                    </button>
                                }
                            </div>


                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center py-10">
                        No classes scheduled for this day
                    </div>
                )}
            </div>
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
