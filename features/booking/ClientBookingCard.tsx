import { Booking } from '@reformetypes/bookingTypes'
import { formatLocalDateTime } from '@utils/dateUtils'

type ClientBookingCardProps = {
    booking: Booking
    onCancel?: (id: string) => void
}

const ClientBookingCard: React.FC<ClientBookingCardProps> = ({ booking, onCancel }) => {
    return (
        <div
            key={booking.id}
            className="flex h-full w-1/4 flex-col flex-wrap justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow"
        >
            <div className="flex flex-col gap-3">
                <p className="font-semibold italic">
                    {formatLocalDateTime(booking.bookedClass.date, 'dddd MMMM D YYYY h:mm A')}
                </p>

                <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">{booking.bookedClass.title}</div>
                    {booking.bookedClass.description && (
                        <div className="text-sm text-gray-600">{booking.bookedClass.description}</div>
                    )}
                    {booking.bookedClass.instructor?.name && (
                        <div className="text-sm">{booking.bookedClass.instructor.name}</div>
                    )}
                </div>
            </div>

            <div className="flex flex-row gap-4">
                {onCancel && (
                    <button
                        onClick={() => onCancel(booking.id)}
                        className="cursor-pointer font-semibold text-red-700 hover:text-red-500"
                    >
                        Cancel booking
                    </button>
                )}
            </div>
        </div>
    )
}

export default ClientBookingCard
