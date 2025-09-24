import { Class, ClassList, CreateClassPayload, PartialUpdateClassPayload } from '@reformetypes/classTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'

export type ClassSliceType = {
    class: Class | null
    classes: ShortPaginatedResponse<Class>
}

const initialState: ClassSliceType = {
    class: null,
    classes: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
}

const classSlice = createSlice({
    name: 'classSlice',
    initialState: initialState,
    reducers: {
        fetchClass: (state, action: PayloadAction<string>) => state,
        fetchClassSuccess: (state, action: PayloadAction<Class>) => {
            state.class = action.payload
            return state
        },
        fetchClasses: (state, action: PayloadAction<Record<string, any>>) => state,
        fetchClassesSuccess: (state, action: PayloadAction<ShortPaginatedResponse<Class>>) => {
            state.classes.count = action.payload.count
            state.classes.next = action.payload.next
            state.classes.previous = action.payload.previous
            state.classes.results = action.payload.results
            return state
        },
        createClass: (state, action: PayloadAction<CreateClassPayload>) => state,
        createClassSuccess: (state, action: PayloadAction<Class>) => {
            state.class = action.payload
            return state
        },
        partialUpdateClass: (state, action: PayloadAction<PartialUpdateClassPayload>) => state,
        partialUpdateClassSuccess: (state, action: PayloadAction<Class>) => {
            const indexToUpdate = state.classes.results.findIndex(
                (classToUpdate) => classToUpdate.id === action.payload.id
            )

            state.classes.results[indexToUpdate] = action.payload
            return state
        },
        clearClass: (state) => {
            state.class = null
            return state
        },
    },
})

export const {
    fetchClasses,
    fetchClassesSuccess,
    createClass,
    createClassSuccess,
    fetchClass,
    fetchClassSuccess,
    partialUpdateClass,
    partialUpdateClassSuccess,
    clearClass,
} = classSlice.actions
export default classSlice.reducer
