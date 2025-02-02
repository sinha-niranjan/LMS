import { combineSlices } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { courseAPi } from "@/features/api/courseApi";

const rootReducer = combineSlices({
  [authApi.reducerPath]: authApi.reducer,
  [courseAPi.reducerPath]: courseAPi.reducer,
  auth: authReducer,
});

export default rootReducer;
