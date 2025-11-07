import { CreateUserPayload, User } from '@reformetypes/userTypes'
import { eRole } from '@reformetypes/authTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { cancelSubscriptionSuccess } from './paymentSlice'
import { AsyncResource } from '@reformetypes/common/ApiTypes'

export type UserSliceType = {
    currentUser: AsyncResource<User | null>
    instructors: ShortPaginatedResponse<User>
    instructor: User | null
    client: User | null
    clients: ShortPaginatedResponse<User>
}

const INITIAL_USER_STATE: UserSliceType = {
    currentUser: {
        fetching: false,
        hasFetched: false,
        data: null,
    },
    instructors: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    instructor: null,
    client: null,
    clients: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: INITIAL_USER_STATE,
    reducers: {
        fetchUserInfo: (state) => {
            state.currentUser.fetching = true
            return state
        },
        fetchUserInfoSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser.fetching = false
            state.currentUser.hasFetched = true
            state.currentUser.data = action.payload
            return state
        },
        reset: (state) => {
            state.currentUser.fetching = false
            state.currentUser.hasFetched = false
            state.currentUser.data = null
            return state
        },
        fetchAllInstructors: (state, action: PayloadAction<Record<string, any>>) => state,
        fetchAllInstructorsSuccess: (state, action: PayloadAction<ShortPaginatedResponse<User>>) => {
            state.instructors.count = action.payload.count
            state.instructors.next = action.payload.next
            state.instructors.previous = action.payload.previous
            state.instructors.results = action.payload.results

            return state
        },
        fetchAllClients: (state, action: PayloadAction<Record<string, any>>) => state,
        fetchAllClientsSuccess: (state, action: PayloadAction<ShortPaginatedResponse<User>>) => {
            state.clients.count = action.payload.count
            state.clients.next = action.payload.next
            state.clients.previous = action.payload.previous
            state.clients.results = action.payload.results
            return state
        },
        createUser: (state, action: PayloadAction<CreateUserPayload>) => state,
        createUserSuccess: (state, action: PayloadAction<User>) => {
            if (action.payload.role === eRole.INSTRUCTOR) {
                state.instructors.results.push(action.payload)
            } else {
                state.clients.results.push(action.payload)
            }

            return state
        },
        retrieveUser: (state, action: PayloadAction<string>) => state,
        retrieveUserSuccess: (state, action: PayloadAction<User>) => {
            if (action.payload.role === eRole.INSTRUCTOR) {
                state.instructor = action.payload
            } else {
                state.client = action.payload
            }
            return state
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => state,
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            if (action.payload.role === eRole.INSTRUCTOR) {
                const index = state.instructors.results.findIndex((inst) => inst.id === action.payload.id)
                if (index !== -1) {
                    state.instructors.results[index] = action.payload
                }
            } else {
                const index = state.clients.results.findIndex((cli) => cli.id === action.payload.id)
                if (index !== -1) {
                    state.clients.results[index] = action.payload
                }
            }
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cancelSubscriptionSuccess, (state, action: PayloadAction<string>) => {
            const purchaseId = action.payload

            if (state.currentUser?.purchases) {
                const purchase = state.currentUser.purchases.find((p) => p.id === purchaseId)
                if (purchase) {
                    purchase.isCancelRequested = true
                }
            }

            if (state.client?.purchases) {
                const purchase = state.client.purchases.find((p) => p.id === purchaseId)
                if (purchase) {
                    purchase.isCancelRequested = true
                }
            }
        })
    },
})

export const {
    fetchUserInfo,
    fetchUserInfoSuccess,
    reset,
    fetchAllInstructors,
    fetchAllInstructorsSuccess,
    createUser,
    createUserSuccess,
    retrieveUser,
    retrieveUserSuccess,
    updateUser,
    updateUserSuccess,
    fetchAllClients,
    fetchAllClientsSuccess,
} = userSlice.actions
export default userSlice.reducer
