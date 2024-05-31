import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api` }),
    tagTypes: ["cart"],
    endpoints: (builder) => {
        return {
            getAllCarts: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["cart"]
            }),
            addCart: builder.mutation({
                query: (data) => {
                    return {
                        url: "/add",
                        method: "POST",
                        body: data
                    }
                },

            }),


        }
    }
})

export const { useGetAllCartsQuery, useAddCartMutation } = cartApi
