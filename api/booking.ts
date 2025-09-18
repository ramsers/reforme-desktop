import {Booking, CreateBookingPayload} from "@reformetypes/bookingTypes";
import {Axios, AxiosResponse} from "axios";
import apiClient from "../config/axios.config";
import APIRoutes from "../config/reformeApiRoutes";

export const postCreateBooking = (bookingInfo: CreateBookingPayload): Promise<AxiosResponse<Booking>> => {
    return apiClient.post(APIRoutes.BOOKING.MAIN, bookingInfo)
}

export const getFetchBookings = (filters?: Record<string, any>): Promise<AxiosResponse<Booking[]>> => {
    return apiClient.get(APIRoutes.BOOKING.MAIN, {params: filters})
}

export const deleteBooking = (id: string): AxiosResponse<void> => {
    return apiClient.delete()
}
