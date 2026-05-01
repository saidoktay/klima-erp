import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  companyName: string;
  companyLogo: string;
};

const initialState: SettingsState = {
  companyName: "",
  companyLogo: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },

    setCompanyLogo: (state, action: PayloadAction<string>) => {
      state.companyLogo = action.payload;
    },
  },
});

export const { setCompanyName, setCompanyLogo } = settingsSlice.actions;
export default settingsSlice.reducer;
