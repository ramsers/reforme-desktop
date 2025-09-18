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
import CalendarBar from "@components/calendar/CalendarBar";
import set = Reflect.set;
import CalendarList from "@components/calendar/CalendarList";
import {getWeekRange} from "../../utils/dateUtils";
import {useRouter} from "next/navigation";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import AppRoutes from "../../config/appRoutes";


type BookingListOwnProps = {
    bookings: Booking[]
}

type BookingListSliceProps = {}

type BookingListDispatchProps = {}

type BookingListProps = BookingListOwnProps &
    BookingListSliceProps &
    BookingListDispatchProps

const BookingList: React.FC<BookingListProps> = ({bookings}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    dayjs.extend(utc);

    function handleReschedule(booking: Booking) {
        const { start, end } = getWeekRange(booking.bookedClass.date);

        dispatch(fetchClasses({ start_date: start, end_date: end }));

        router.push(`${AppRoutes.classes.list}?original_booking=${booking.id}`);
    }

    return (
        <>
            <TabGroup className={"flex flex-col gap-6"}>
                <TabList className={"flex flex-row gap-5 font-semibold border-b-2 " +
                "border-brown-default max-w-[30vw]"}>
                    <Tab className={"data-selected:bg-brown-default/40 focus:outline-none px-3 py-1.5 rounded-t-md"}>Upcoming bookings</Tab>
                    <Tab className={"data-selected:bg-brown-default/40 focus:outline-none px-3 py-1.5 rounded-t-md"}>Completed bookings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="w-full flex flex-row flex-wrap gap-3">
                            {bookings && bookings?.map((bk: Booking) => (
                                <div key={bk.id}
                                     className="p-4 rounded-xl shadow bg-white border border-gray-200 flex flex-col gap-3">
                                    <div className="flex flex-col gap-3">
                                        <p className="italic font-semibold">
                                            {dayjs(bk.bookedClass.date).format("dddd MMMM D YYYY h:mm A")}
                                        </p>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-2xl font-bold">{bk.bookedClass.title}</div>
                                            <div className="text-sm text-gray-600">{bk.bookedClass.description}</div>
                                            <span className="text-sm">{bk.bookedClass.instructor.name}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-between">
                                        <button
                                            className="font-semibold text-red-700 hover:text-red-500
                                             cursor-pointer">
                                            Cancel
                                        </button>
                                        <button className={"font-semibold text-green-700 hover:text-green-500"}>
                                            Complete
                                        </button>
                                        <button
                                            onClick={() => handleReschedule(bk)}
                                            className={"font-semibold text-blue-700 hover:text-blue-500"}>
                                            Reschedule
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>Content 2</TabPanel>
                    <TabPanel>Content 3</TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    )
}

const mapStateToProps = (store: RootState): BookingListSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): BookingListDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)
