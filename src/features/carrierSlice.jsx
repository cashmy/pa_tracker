import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import authHeader from "../../services/authHeader";

export const apiCarrierSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44394/api/carrier",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Carriers"],
  endpoints: (builder) => {
    return {
      fetchAllCarriers: builder.query({
        query() {
          return "";
        },
        // refetchOnMountOrArgChange: true,
        providesTags: (result, error, arg) => ["Carriers"],
      }),
      fetchCarrier: builder.query({
        query(id) {
          return `/${id}`;
        },
      }),

      addCarrier: builder.mutation({
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Carriers"],
      }),

      updateCarrier: builder.mutation({
        query(body) {
          return {
            url: `/${body.carrierId}`,
            method: "PUT",
            body,
          };
        },
        invalidatesTags: ["Carriers"],
      }),

      deleteCarrier: builder.mutation({
        query(id) {
          return {
            url: `/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Carriers"],
      }),
    };
  },
});

export const {
  useFetchAllCarriersQuery,
  useFetchCarrierQuery,
  useAddCarrierMutation,
  useUpdateCarrierMutation,
  useDeleteCarrierMutation,
} = apiCarrierSlice;
