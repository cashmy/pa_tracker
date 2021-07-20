import { configureStore } from "@reduxjs/toolkit";
import { apiPriorAuthSlice } from "../features/priorAuth/priorAuthSlice";
import { apiCarrierSlice } from "../features/carrierSlice";

export const store = configureStore({
  reducer: {
    [apiPriorAuthSlice.reducerPath]: apiPriorAuthSlice.reducer,
    [apiCarrierSlice.reducerPath]: apiCarrierSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiPriorAuthSlice.middleware)
      .concat(apiCarrierSlice.middleware);
  },
});
