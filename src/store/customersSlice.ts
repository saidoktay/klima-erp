import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Customer } from "../types/customer";
import type { Task } from "../types/task";

const makeCustomerId = (name: string, phone: string) =>
  `${name.trim().toLowerCase()}-${phone.replace(/\s+/g, "")}`;


const taskToJob = (task: Task) => ({
  taskId: task.id,
  completedAt: new Date().toISOString(),
  taskType: task.taskType,
  work: task.work,
  price: task.price,
  assignedPersonnelId: task.assignedPersonnelId,
  stockDrops: task.stockDrops,
});

const customersSlice = createSlice({
  name: "customers",
  initialState: [] as Customer[],
  reducers: {
    recordCompletedTask(state, action: PayloadAction<Task>) {
      const task = action.payload;
      const customerId = makeCustomerId(task.customerName, task.customerNumber);


      const addressText = `${task.address.city}/${task.address.district} ${task.address.quarter} mah. ${task.address.detail}`;

      const existingCustomer = state.find((c) => c.id === customerId);

      if (!existingCustomer) {
        state.unshift({
          id: customerId,
          name: task.customerName,
          phone: task.customerNumber,
          addressText,
          jobs: [taskToJob(task)],
        });
        return;
      }

      existingCustomer.name = task.customerName;
      existingCustomer.phone = task.customerNumber;
      existingCustomer.addressText = addressText;

      const existingJobIndex = existingCustomer.jobs.findIndex(
        (job) => job.taskId === task.id,
      );

      if (existingJobIndex === -1) {
        existingCustomer.jobs.unshift(taskToJob(task));
      } else {
        existingCustomer.jobs[existingJobIndex] = {
          ...taskToJob(task),
          completedAt: existingCustomer.jobs[existingJobIndex].completedAt,
        };
      }
    },
    removeCompletedTask(state, action: PayloadAction<Task>) {
      const task = action.payload;
      const customerId = makeCustomerId(task.customerName, task.customerNumber);


      const customerIndex = state.findIndex((c) => c.id === customerId);
      if (customerIndex === -1) return;

      state[customerIndex].jobs = state[customerIndex].jobs.filter(
        (job) => job.taskId !== task.id,
      );

      if (state[customerIndex].jobs.length === 0) {
        state.splice(customerIndex, 1);
      }
    },
  },
});

export const { recordCompletedTask, removeCompletedTask } =
  customersSlice.actions;
export default customersSlice.reducer;
