import { createSlice } from '@reduxjs/toolkit'

const studentSlice = createSlice({
    name: "student",
    initialState: {
        studentArray: []
    },
    reducers: {
        addStudent: (state, action) => {
            state.studentArray = action.payload;
        }
    }
});

export const { addStudent } = studentSlice.actions

export default studentSlice.reducer