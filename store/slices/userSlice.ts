import { CreateUserPayload, User } from '@reformetypes/userTypes'
import { eRole } from '@reformetypes/authTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'

export type UserSliceType = {
    id: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    password: string | null
    role: eRole | null
    createdAt?: string | null
    instructors: ShortPaginatedResponse<User>
    instructor: User | null
    client: User | null
    clients: ShortPaginatedResponse<User>
}

const INITIAL_USER_STATE: UserSliceType = {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: null,
    createdAt: null,
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
        fetchUserInfo: (state) => state,
        fetchUserInfoSuccess: (state, action: PayloadAction<User>) => {
            console.log('I AM HITTING SUCCESS ==========', action.payload)
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.phoneNumber = action.payload.phoneNumber
            state.password = action.payload.password
            state.role = action.payload.role
            return state
        },
        reset: (state) => {
            state.id = ''
            state.name = ''
            state.email = ''
            state.phoneNumber = ''
            state.password = ''
            state.role = null
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
