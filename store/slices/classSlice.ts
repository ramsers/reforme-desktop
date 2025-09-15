import {Class, ClassList} from "@reformetypes/classTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ClassSliceType = {
    classes: Class[]
}

const initialState: ClassSliceType = {
    classes: []
}


const classSlice = createSlice({
    name: 'classSlice',
    initialState: initialState,
    reducers: {
        fetchClasses: (state, action: PayloadAction<string>) => state,
        fetchClassesSuccess: (state, action: PayloadAction<ClassList>) => {
            state.classes = action.payload
            return state
        },
    }
})

export const { fetchClasses, fetchClassesSuccess } = classSlice.actions;
export default classSlice.reducer
