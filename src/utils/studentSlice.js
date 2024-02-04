import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
    name: "studentData",
    initialState: {
        studentData: [],
        filterData: []
    },
    reducers: {
        addStudent: (state, action) => {
            state.studentData = action.payload
            state.filterData = action.payload
        },
        filterDataBySlot: (state, action) => {
            if (action.payload === "") {
                state.filterData = state.studentData;
            }
            else {
                state.filterData = state.studentData.filter((items) => {
                    return items.Slot === action.payload
                })
            }
        }
    }
});

export const { addStudent, filterDataBySlot } = studentSlice.actions

export default studentSlice.reducer