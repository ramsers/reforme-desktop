import {RootState} from '@store/index'
import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from 'redux'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {fetchClasses} from "@store/slices/classSlice";
import {fetchBookings} from "@store/slices/bookingSlice"
import {Class} from "@reformetypes/classTypes";
import {Booking} from "@reformetypes/bookingTypes";

type BookingCalendarOwnProps = {}

type BookingCalendarSliceProps = {}

type BookingCalendarDispatchProps = {}

type BookingCalendarProps = BookingCalendarOwnProps &
    BookingCalendarSliceProps &
    BookingCalendarDispatchProps

const BookingCalendar: React.FC<BookingCalendarProps> = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state: RootState) => state.booking.bookings.results);
    const user = useSelector((state: RootState) => state.user);
    console.log('classes ==============', bookings)
    dayjs.extend(utc);

    // current week (today + next 6 days)
    const [days, setDays] = useState(
        Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day"))
    );

    // selected day defaults to today
    const [selectedDay, setSelectedDay] = useState(dayjs());

    useEffect(() => {
        // whenever selectedDay changes, fetch classes
        // dispatch(fetchClasses({ date: selectedDay.format("YYYY-MM-DD") }));
        dispatch(fetchBookings());
    }, [dispatch, selectedDay]);

    console.log('BOOKI?NGS ===========', bookings)
    //TODO - set up booking and classes calendar to have the monthly/top toggle (next 7 day span)
    //TODO - see if booking and class calendar can have some kind of common commponent
    //TODO - have archived/completed section to show previously booked classes
    //TODO - wth does reschedule do?

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
                {bookings && bookings.length > 0 ? (
                    bookings.map((bk: Booking) => (
                        <div
                            key={bk.bookedClass.id}
                            className="p-4 rounded-xl shadow bg-white border border-gray-200"
                        >
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="text-lg font-bold">{bk.bookedClass.title}</div>
                                    <div className="text-sm text-gray-600">{bk.bookedClass.description}</div>
                                    <span className="text-sm">{bk.bookedClass.instructor.name} • {dayjs(bk.bookedClass.date).format("h:mm A")}</span>
                                </div>

                                <div className="flex flex-row gap-2">
                                    <button className="hover:bg-gray-10/50 transition-colors hover:text-foreground
                                        bg-gray-10 border border-brown-50 text-brown-default font-semibold rounded-lg px-3 py-1">
                                        Cancel
                                    </button>
                                    <button className="hover:bg-gray-10 transition-colors hover:text-brown-default
                                        bg-brown-default font-semibold text-main rounded-lg px-3 py-1">
                                        Reschedule
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center py-10">
                        No appointments scheduled for this day
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (store: RootState): BookingCalendarSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): BookingCalendarDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(BookingCalendar)
