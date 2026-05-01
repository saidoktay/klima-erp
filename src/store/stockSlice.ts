import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type StockItem = {
  id: string;
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock: number;
  purchaseHistory: PurchaseRecord[];
};
type PurchaseRecord = {
  id: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
};

type AddItemPayload = {
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock?: number;
  purchasePrice: number;
  purchaseDate: string;
};

type UpdateItemPayload = {
  id: string;
  mark: string;
  model: string;
  type: string;
  stock: number;
  minStock: number;
  purchaseHistory?: PurchaseRecord[];
};

type DropStockPayload = {
  id: string;
  amount: number;
};
type AddStockPayload = {
  id: string;
  amount: number;
};

const initialState: StockItem[] = [
  {
    id: "1",
    mark: "Sigma",
    model: "comfort",
    type: "Klima",
    stock: 8,
    minStock: 5,
    purchaseHistory: [],
  },
  {
    id: "2",
    mark: "Sigma",
    model: "exclusive",
    type: "Klima",
    stock: 3,
    minStock: 5,
    purchaseHistory: [],
  },
];

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddItemPayload>) {
      const incoming = action.payload;

      state.unshift({
        id: nanoid(),
        mark: incoming.mark,
        model: incoming.model,
        type: incoming.type,
        stock: incoming.stock,
        minStock: incoming.minStock ?? 0,
        purchaseHistory: [
          {
            id: nanoid(),
            quantity: incoming.stock,
            purchasePrice: incoming.purchasePrice,
            purchaseDate: incoming.purchaseDate,
          },
        ],
      });
    },
    updateItem(state, action: PayloadAction<UpdateItemPayload>) {
      const item = state.find((stock) => stock.id === action.payload.id);

      if (item) {
        item.mark = action.payload.mark;
        item.model = action.payload.model;
        item.type = action.payload.type;
        item.stock = action.payload.stock;
        item.minStock = action.payload.minStock;
        item.purchaseHistory = action.payload.purchaseHistory ?? [];
      }
    },
    dropStock(state, action: PayloadAction<DropStockPayload>) {
      const item = state.find((stock) => stock.id === action.payload.id);

      if (item) {
        item.stock = Math.max(0, item.stock - action.payload.amount);
      }
    },
    addStock(state, action: PayloadAction<AddStockPayload>) {
      const item = state.find((stock) => stock.id === action.payload.id);

      if (item) {
        item.stock = item.stock + action.payload.amount;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, dropStock, addStock, removeItem } =
  stockSlice.actions;
export default stockSlice.reducer;
