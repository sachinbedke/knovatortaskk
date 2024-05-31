import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {},
    reducers: {
        userInfo: (state, { payload }) => {
            state.user = payload


        },
        addCart: (state, { payload }) => {
            state.cart = payload


        }
    },

    extraReducers: builder => builder



})

export const { userInfo, addCart } = chatSlice.actions
export default chatSlice.reducer