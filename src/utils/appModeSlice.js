import { createSlice } from '@reduxjs/toolkit'

const appModeSlice = createSlice({
    name: "appModeSlice",
    initialState: {
        toggle: false,
    },
    reducers: {
        addDarkMode: (state, action) => {
            state.toggle = action.payload
        }
    }
});

export const { addDarkMode } = appModeSlice.actions

export default appModeSlice.reducer