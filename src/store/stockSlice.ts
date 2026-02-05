import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type StockItem = {
  id: string;
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock: number;
};

type AddItemPayload = {
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock?: number;
};
const initialState: StockItem[] = [
  {
    id: "1",
    mark: "Sigma",
    model: "comfort",
    type: "Klima",
    stock: 8,
    minStock: 5,
  },
  {
    id: "2",
    mark: "Sigma",
    model: "exclusive",
    type: "Klima",
    stock: 3,
    minStock: 5,
  },
];

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddItemPayload>) {
      const incoming = action.payload;

      const existing = state.find(
        (item) =>
          item.mark === incoming.mark &&
          item.model === incoming.model &&
          item.type === incoming.type,
      );

      if (existing) {
        existing.stock = Math.max(0, existing.stock + incoming.stock);

        if (incoming.minStock !== undefined) {
          existing.minStock = incoming.minStock;
        }
        return;
      }

      state.unshift({
        id: nanoid(),
        mark: incoming.mark,
        model: incoming.model,
        type: incoming.type,
        stock: incoming.stock,
        minStock: incoming.minStock ?? 0,
      });
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = stockSlice.actions;
export default stockSlice.reducer;
