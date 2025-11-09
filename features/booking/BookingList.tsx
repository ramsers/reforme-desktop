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
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import SkeletonBlock from '@components/SkeletonBlock/SkeletonBlock'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import ClientBookingCard from './ClientBookingCard'

type BookingListOwnProps = {
    // bookings: AsyncResource<Booking[]>
}

type BookingListSliceProps = {}

type BookingListDispatchProps = {}

type BookingListProps = BookingListOwnProps & BookingListSliceProps & BookingListDispatchProps

const BookingList: React.FC<BookingListProps> = ({}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const bookings = useSelector((state: RootState) => state.booking.bookings)
    dayjs.extend(isSameOrAfter)
    dayjs.extend(utc)

    const handleReschedule = (booking: Booking) => {
        const { start, end } = getWeekRange(booking.bookedClass.date)

        dispatch(fetchClasses({ start_date: start, end_date: end }))

        router.push(`${AppRoutes.classes.list}?original_booking=${booking.id}`)
    }

    const handleCancel = (bookingId: string) => {
        dispatch(deleteUserBooking(bookingId))
    }

    const upcomingBookings =
        bookings.data?.results?.filter((bk) => dayjs(bk.bookedClass.date).isSameOrAfter(dayjs(), 'day')) || []

    const pastBookings =
        bookings.data?.results?.filter((bk) => dayjs(bk.bookedClass.date).isBefore(dayjs(), 'day')) || []

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
                            {bookings.fetching ? (
                                <>
                                    <SkeletonBlock className="h-48 w-full lg:w-[48%]" />
                                </>
                            ) : upcomingBookings.length ? (
                                upcomingBookings.map((bk: Booking) => (
                                    <ClientBookingCard
                                        key={bk.id}
                                        booking={bk}
                                        onCancel={handleCancel}
                                        onReschedule={handleReschedule}
                                    />
                                ))
                            ) : (
                                <p className="text-left text-gray-500">No upcoming bookings</p>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="flex w-full flex-row flex-wrap gap-3">
                            {pastBookings.length ? (
                                pastBookings.map((bk: Booking) => <ClientBookingCard key={bk.id} booking={bk} />)
                            ) : (
                                <p className="text-left text-gray-500">No classes booked yet</p>
                            )}
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    )
}

const mapStateToProps = (store: RootState): BookingListSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): BookingListDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)
