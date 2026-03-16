import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CreditItem = {
  id: string;
  customer: string;
  phone: string;
  totalDebt: number;
  paid: number;
  dueDate: string;
  note: string;
};

type AddCreditPayload = {
  customer: string;
  phone: string;
  totalDebt: number;
  paid?: number;
  dueDate: string;
  note?: string;
};
type PayCreditPayload = {
  id: string;
  amount: number;
};
type AddDebtPayload = {
  id: string;
  amount: number;
};

const initialState: CreditItem[] = [];

const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    addCredit(state, action: PayloadAction<AddCreditPayload>) {
      state.unshift({
        id: nanoid(),
        customer: action.payload.customer,
        phone: action.payload.phone,
        totalDebt: action.payload.totalDebt,
        paid: action.payload.paid ?? 0,
        dueDate: action.payload.dueDate,
        note: action.payload.note ?? "",
      });
    },
    removeCredit(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
    payCredit(state, action: PayloadAction<PayCreditPayload>) {
      const credit = state.find((item) => item.id === action.payload.id);

      if (credit) {
        credit.paid = Math.min(
          credit.totalDebt,
          credit.paid + action.payload.amount,
        );
      }
    },
    addDebt(state, action: PayloadAction<AddDebtPayload>) {
      const credit = state.find((item) => item.id === action.payload.id);

      if (credit) {
        credit.totalDebt += action.payload.amount;
      }
    },
  },
});

export const { addCredit, removeCredit, payCredit, addDebt } =
  creditSlice.actions;
export default creditSlice.reducer;
