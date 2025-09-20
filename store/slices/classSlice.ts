import {Class, ClassList, CreateClassPayload} from "@reformetypes/classTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

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
    }
}


const classSlice = createSlice({
    name: 'classSlice',
    initialState: initialState,
    reducers: {
        fetchClasses: (state, action: PayloadAction<Record<string, any>>) => state,
        fetchClassesSuccess: (state, action: PayloadAction<ShortPaginatedResponse<Class>>) => {
            console.log('ACTION SUCCESS =================', action.payload)
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
        }
    }
})

export const { fetchClasses, fetchClassesSuccess, createClass, createClassSuccess } = classSlice.actions;
export default classSlice.reducer
