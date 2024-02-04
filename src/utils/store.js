import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import studentReducer from "./studentSlice"
import appModeReducer from "./appModeSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        appMode: appModeReducer
    }
})