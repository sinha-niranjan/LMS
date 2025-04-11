import rootReducer from "@/app/rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(authApi.middleware)
      .concat(courseApi.middleware)
      .concat(purchaseApi.middleware)
      .concat(courseProgressApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }),
  );
};

initializeApp();
