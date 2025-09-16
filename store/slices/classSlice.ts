import {Class, ClassList} from "@reformetypes/classTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShortPaginatedResponse} from "@reformetypes/common/PaginatedResponseTypes";

export type ClassSliceType = {
    classes: ShortPaginatedResponse<Class>
}

const initialState: ClassSliceType = {
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
    }
})

export const { fetchClasses, fetchClassesSuccess } = classSlice.actions;
export default classSlice.reducer
