import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./api";

import chatSlice from "./chatSlice";


const reduxStore = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        user: chatSlice
    },
    middleware: def => [...def(), cartApi.middleware]
})

export default reduxStore