import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/UserReducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

// server URL
// export const serverURL = "http://172.16.0.2:8080";
export const serverURL = "https://i-store-app.onrender.com";
