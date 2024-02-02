import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addAccount: (state, action) => {
            return action.payload
        },
        logoutUser: (state) => {
            return null;
        }
    }
})

export const { addAccount, logoutUser } = userSlice.actions
export default userSlice.reducer