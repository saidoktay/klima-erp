import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import stockReducer from "./stockSlice";
import taskOptionsReducer from "./taskOptionsSlice";
import creditReducer from "./creditSlice";
import personnelReducer from "./personnelSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    stock:stockReducer,
    taskOptions: taskOptionsReducer,
    credit: creditReducer,
    personnel: personnelReducer,

  },
});
export type RootState = ReturnType<typeof store.getState>;
