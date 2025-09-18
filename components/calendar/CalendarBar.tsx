"use client"

import {RootState} from '@store/index'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import dayjs, {Dayjs} from "dayjs";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

type CalendarBarOwnProps = {
    selectedDay: Dayjs;
    setSelectedDay: (day: Dayjs) => void;
}

type CalendarBarSliceProps = {}

type CalendarBarDispatchProps = {}

type CalendarBarProps = CalendarBarOwnProps &
    CalendarBarSliceProps &
    CalendarBarDispatchProps

const CalendarBar: React.FC<CalendarBarProps> = ({selectedDay, setSelectedDay}) => {
    const [weekOffset, setWeekOffset] = useState(0);
    const today = dayjs();

    const weekStart = today.startOf("week").add(weekOffset, "week");
    const weekEnd = weekStart.add(6, "day");

    const days = Array.from({ length: 7 }, (_, i) =>
        weekStart.add(i, "day")
    );

    useEffect(() => {
        if (weekOffset === 0) {
            setSelectedDay(today);
        } else {
            setSelectedDay(weekStart);
        }    }, [weekOffset]);

    return (
        <>
            <div className="flex items-center justify-between gap-2 items-start">
                <button onClick={() => setWeekOffset(weekOffset - 1)}>
                    <ChevronLeftIcon className="h-6 w-6 text-brown-default"/>
                </button>

                <h2 className="text-lg font-semibold">
                    {weekStart.format("MMM D")} – {weekEnd.format("MMM D")}
                </h2>

                <button onClick={() => setWeekOffset(weekOffset + 1)}>
                    <ChevronRightIcon className="h-6 w-6 text-brown-default"/>
                </button>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
                {days.map((day) => {
                    const isSelected = day.isSame(selectedDay, "day");
                    return (
                        <button
                            key={day.format("YYYY-MM-DD")}
                            onClick={() => setSelectedDay(day)}
                            className={`w-14 px-4 py-2 rounded-xl border transition-all flex flex-col items-center ${
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
        </>
    )
}

const mapStateToProps = (store: RootState): CalendarBarSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): CalendarBarDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBar)
