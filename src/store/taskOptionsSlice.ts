import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type TaskOptionsState = {
  taskTypes: string[];
  customerNames: string[];
  customerNumbers: string[];
  works: string[];
  prices: string[];
};

const initialState: TaskOptionsState = {
  taskTypes: ["Bakım", "Montaj", "Servis"],
  customerNames: ["Erol Özdemir", "Bim", "Ahmet Çal"],
  customerNumbers: ["5325558979", "5337886868", "5538337373", "5557858585"],
  works: [
    "Cihazların Bakımları yapılcak ve Gaz basılacak",
    "Dış ünite balkona koyulacak",
    "Sensör değiştirilecek",
  ],
  prices: ["15000", "5000", "8500", "25000", "150000"],
};

const taskOptionsSlice = createSlice({
  name: "taskOptions",
  initialState,
  reducers: {
    addOption(
      state,
      action: PayloadAction<{ key: keyof TaskOptionsState; value: string }>
    ) {
      const { key, value } = action.payload;
      const trimmed = value.trim();
      if (!trimmed) return;
      if (!state[key].includes(trimmed)) {
        state[key].unshift(trimmed);
      }
    },
  },
});

export const { addOption } = taskOptionsSlice.actions;
export default taskOptionsSlice.reducer;
