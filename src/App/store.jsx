import { configureStore } from "@reduxjs/toolkit";
import { apiPriorAuthSlice } from "../features/priorAuth/priorAuthSlice";

export const store = configureStore({
  reducer: {
    [apiPriorAuthSlice.reducerPath]: apiPriorAuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiPriorAuthSlice.middleware);
  },
});
