import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types/task";
import { arrayMove } from "@dnd-kit/sortable";


const STATUS_ORDER = ["todo", "inprogress", "done"] as const;
type AddTaskPayload = Omit<Task, "id">;

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.unshift(action.payload);
      },
      prepare(payload: AddTaskPayload) {
        return { payload: { ...payload, id: nanoid() } };
      },
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ taskId: string; newStatus: Task["status"] }>
    ) {
      const task = state.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.newStatus;
      }
    },
    moveTask(
      state,
      action: PayloadAction<{
        taskId: string;
        targetStatus: Task["status"];
        targetIndex: number;
      }>
    ) {
      const { taskId, targetStatus, targetIndex } = action.payload;

      const sourceTask = state.find((t) => t.id === taskId);
      if (!sourceTask) return state;

      const byStatus = {
        todo: state.filter((t) => t.status === "todo"),
        inprogress: state.filter((t) => t.status === "inprogress"),
        done: state.filter((t) => t.status === "done"),
      };

      const sourceStatus = sourceTask.status;

      if (sourceStatus === targetStatus) {
        const list = byStatus[sourceStatus];
        const oldIndex = list.findIndex((t) => t.id === taskId);
        if (oldIndex === -1) return state;

        const clampedIndex = Math.min(
          Math.max(targetIndex, 0),
          list.length - 1
        );

        if (oldIndex === clampedIndex) return state;
        byStatus[sourceStatus] = arrayMove(list, oldIndex, clampedIndex);
      } else {
        const listFrom = byStatus[sourceStatus];
        const listTo = byStatus[targetStatus];

        const movingIndex = listFrom.findIndex((t) => t.id === taskId);
        if (movingIndex === -1) return state;

        const [movingTask] = listFrom.splice(movingIndex, 1);
const movedTask = { ...movingTask, status: targetStatus };

        const clampedIndex = Math.min(
          Math.max(targetIndex, 0),
          listTo.length
        );
        listTo.splice(clampedIndex, 0, movedTask);
      }

      return STATUS_ORDER.flatMap((status) => byStatus[status]);
    },
  },
});

export const { addTask, updateTaskStatus,moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
