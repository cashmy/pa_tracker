import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import authHeader from "../../services/authHeader";

export const apiPriorAuthSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44394/api/priorAuth",
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchAllPriorAuths: builder.query({
        query(limit = 10) {
          return `?limit=${limit}`;
        },
      }),
      fetchNonApprvdCountForProviders: builder.query({
        query() {
          return "/provcount";
        },
      }),
      fetchNonApprvdCountForCarriers: builder.query({
        query(limit = 20) {
          return `/carrcount?limit=${limit}`;
        },
      }),
    };
  },
});

export const {
  useFetchAllPriorAuthsQuery,
  useFetchNonApprvdCountForProvidersQuery,
  useFetchNonApprvdCountForCarriersQuery,
} = apiPriorAuthSlice;
