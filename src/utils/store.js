import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import studentReducer from "./studentSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer
    }
})