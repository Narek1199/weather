import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import features, { weather5Day3HoursApi } from './actions/features'

export const store = configureStore({
  reducer: {
		features,
    [weather5Day3HoursApi.reducerPath]: weather5Day3HoursApi.reducer,
		
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weather5Day3HoursApi.middleware),
});

setupListeners(store.dispatch);
