import rootReducer from "@/app/rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseAPi } from "@/features/api/courseApi";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, courseAPi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }),
  );
};

initializeApp();
