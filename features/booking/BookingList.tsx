import { RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { fetchClasses } from '@store/slices/classSlice'
import { fetchBookings } from '@store/slices/bookingSlice'
import { Class } from '@reformetypes/classTypes'
import { Booking } from '@reformetypes/bookingTypes'
import CalendarBar from '@components/calendar/CalendarBar'
import set = Reflect.set
import CalendarList from '@components/calendar/CalendarList'
import { getWeekRange } from '../../utils/dateUtils'
import { useRouter } from 'next/navigation'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import AppRoutes from '../../config/appRoutes'
import { deleteUserBooking } from '@store/slices/bookingSlice'

type BookingListOwnProps = {
    bookings: Booking[]
}

type BookingListSliceProps = {}

type BookingListDispatchProps = {}

type BookingListProps = BookingListOwnProps & BookingListSliceProps & BookingListDispatchProps

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    dayjs.extend(utc)

    const handleReschedule = (booking: Booking) => {
        const { start, end } = getWeekRange(booking.bookedClass.date)

        dispatch(fetchClasses({ start_date: start, end_date: end }))

        router.push(`${AppRoutes.classes.list}?original_booking=${booking.id}`)
    }

    const handleCancel = (bookingId: string) => {
        dispatch(deleteUserBooking(bookingId))
    }

    return (
        <>
            <TabGroup className={'flex flex-col gap-6'}>
                <TabList
                    className={'flex flex-row gap-5 border-b-2 font-semibold ' + 'border-brown-default max-w-[30vw]'}
                >
                    <Tab className={'data-selected:bg-brown-default/40 rounded-t-md px-3 py-1.5 focus:outline-none'}>
                        Upcoming bookings
                    </Tab>
                    <Tab className={'data-selected:bg-brown-default/40 rounded-t-md px-3 py-1.5 focus:outline-none'}>
                        Completed bookings
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="flex w-full flex-row flex-wrap gap-3">
                            {bookings &&
                                bookings?.map((bk: Booking) => (
                                    <div
                                        key={bk.id}
                                        className="flex h-full min-h-48 flex-col flex-wrap justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <p className="font-semibold italic">
                                                {dayjs(bk.bookedClass.date).format('dddd MMMM D YYYY h:mm A')}
                                            </p>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold">{bk.bookedClass.title}</div>
                                                <div className="text-sm text-gray-600">
                                                    {bk.bookedClass.description}
                                                </div>
                                                <div className="text-sm">{bk.bookedClass.instructor?.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <button
                                                onClick={() => handleCancel(bk.id)}
                                                className="cursor-pointer font-semibold text-red-700 hover:text-red-500"
                                            >
                                                Cancel
                                            </button>
                                            <button className={'font-semibold text-green-700 hover:text-green-500'}>
                                                Complete
                                            </button>
                                            <button
                                                onClick={() => handleReschedule(bk)}
                                                className={'font-semibold text-blue-700 hover:text-blue-500'}
                                            >
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

const mapStateToProps = (store: RootState): BookingListSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): BookingListDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)
