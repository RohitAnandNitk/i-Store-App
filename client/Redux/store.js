import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/UserReducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

// server URL
export const serverURL = "http://10.50.33.168:8080";
