import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./reducer/shopReducer";
export const store = configureStore({
  reducer: {
    shopReducer: shopReducer,
  },
});
