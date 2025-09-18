import {Booking, CreateBookingPayload} from "@reformetypes/bookingTypes";
import {AxiosResponse} from "axios";
import apiClient from "../config/axios.config";
import APIRoutes from "../config/reformeApiRoutes";

export const postCreateBooking = (bookingInfo: CreateBookingPayload): Promise<AxiosResponse<Booking>> => {
    return apiClient.post(APIRoutes.BOOKING.MAIN, bookingInfo)
}

export const getFetchBookings = (): Promise<AxiosResponse<Booking[]>> => {
    return apiClient.get(APIRoutes.BOOKING.MAIN)
}
