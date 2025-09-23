import {CreateUserPayload, User} from "@reformetypes/userTypes";
import {eRole} from "@reformetypes/authTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserSliceType = {
    name: string | null
    email: string | null
    phoneNumber: string | null
    password: string | null
    role: eRole | null
    instructors: User[]
}

const INITIAL_USER_STATE: UserSliceType = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: null,
    instructors: []
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: INITIAL_USER_STATE,
    reducers:{
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
            state.role = ''
            return state
        },
        fetchAllInstructors: (state) => state,
        fetchAllInstructorsSuccess: (state, action: PayloadAction<User[]>) => {
            state.instructors = action.payload
            return state
        },
        createUser: (state, action: PayloadAction<CreateUserPayload>) => state,
        createUserSuccess: (state, action: PayloadAction<User>) => {

            if (action.payload.role === eRole.INSTRUCTOR) {
                state.instructors.push(action.payload)
            }

            return state
        }
    }
})

export const {
    fetchUser, fetchUserSuccess, reset, fetchAllInstructors, fetchAllInstructorsSuccess, createUser, createUserSuccess
} = userSlice.actions;
export default userSlice.reducer
