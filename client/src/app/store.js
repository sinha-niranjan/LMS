import rootReducer from "@/app/rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});
