import { User } from '@reformetypes/userTypes'
import { useDispatch } from 'react-redux'
import { deleteUserBooking } from '@store/slices/bookingSlice'
import { Booking, BookingClient } from '@reformetypes/bookingTypes'
import { removeClassBooking } from '@store/slices/classSlice'
import AppRoutes from 'config/appRoutes'
import { useRouter } from 'next/navigation'

type BookerModalRowPRops = {
    booking: BookingClient
    bookedClassId: string
}

const BookerModalRow: React.FC<BookerModalRowPRops> = ({ booking, bookedClassId }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleDeleteBooking = () => {
        dispatch(deleteUserBooking(booking.id))
        dispatch(removeClassBooking({ classId: bookedClassId, bookingId: booking.id }))
    }

    const handleRedirectToClient = () => {
        router.push(AppRoutes.dashboard.clients.client(booking.client.id))
    }

    return (
        <div className="flex flex-row items-center justify-between p-2" key={booking.id}>
            <p>{booking.client.name}</p>
            <div className="flex gap-2">
                <button
                    onClick={handleRedirectToClient}
                    type="button"
                    className="hover:bg-gray-10 hover:text-brown-default bg-brown-default text-main rounded-lg px-3 py-1 font-semibold transition-colors"
                >
                    View
                </button>
                <button
                    type="button"
                    onClick={handleDeleteBooking}
                    className="hover:bg-foreground hover:text-background rounded-lg border border-gray-300 px-3 py-1 font-semibold text-gray-700 transition-colors"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default BookerModalRow
