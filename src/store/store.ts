import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import stockReducer from "./stockSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    stock:stockReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
