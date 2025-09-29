import { CreateUserPayload, User } from '@reformetypes/userTypes'
import { eRole } from '@reformetypes/authTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserSliceType = {
    id: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    password: string | null
    role: eRole | null
    createdAt?: string | null
    instructors: User[]
    instructor: User | null
    client: User | null
    clients: User[]
}

const INITIAL_USER_STATE: UserSliceType = {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: null,
    createdAt: null,
    instructors: [],
    instructor: null,
    client: null,
    clients: [],
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: INITIAL_USER_STATE,
    reducers: {
        fetchUser: (state) => state,
        fetchUserSuccess: (state, action: PayloadAction<User>) => {
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
        fetchAllInstructors: (state) => state,
        fetchAllInstructorsSuccess: (state, action: PayloadAction<User[]>) => {
            state.instructors = action.payload
            return state
        },
        fetchAllClients: (state) => state,
        fetchAllClientsSuccess: (state, action: PayloadAction<User[]>) => {
            state.clients = action.payload
            return state
        },
        createUser: (state, action: PayloadAction<CreateUserPayload>) => state,
        createUserSuccess: (state, action: PayloadAction<User>) => {
            if (action.payload.role === eRole.INSTRUCTOR) {
                state.instructors.push(action.payload)
            }
            state.clients.push(action.payload)

            return state
        },
        retrieveUser: (state, action: PayloadAction<string>) => state,
        updateUser: (state, action: PayloadAction<Partial<User>>) => state,
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            const index = state.instructors.findIndex((inst) => inst.id === action.payload.id)
            if (index !== -1) {
                state.instructors[index] = action.payload
            }
            return state
        },
    },
})

export const {
    fetchUser,
    fetchUserSuccess,
    reset,
    fetchAllInstructors,
    fetchAllInstructorsSuccess,
    createUser,
    createUserSuccess,
    retrieveUser,
    updateUser,
    updateUserSuccess,
    fetchAllClients,
    fetchAllClientsSuccess,
} = userSlice.actions
export default userSlice.reducer
