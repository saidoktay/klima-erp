import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import stockReducer from "./stockSlice";
import taskOptionsReducer from "./taskOptionsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    stock:stockReducer,
    taskOptions: taskOptionsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
