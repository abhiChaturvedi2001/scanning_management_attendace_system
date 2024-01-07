import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: null,
    reducers: {
        addUsers: (state, action) => {
            return action.payload;
        },
        removeUsers: (state) => {
            return null;
        }
    }
})


export const { addUsers, removeUsers } = userSlice.actions;
export default userSlice.reducer