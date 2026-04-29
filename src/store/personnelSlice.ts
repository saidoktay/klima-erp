import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Personnel } from "../types/personnel";

type AddPersonnelPayload = Omit<Personnel, "id" | "active">;

const initialState: Personnel[] = [
  {
    id: "p1",
    name: "Ali Usta",
    phone: "5321112233",
    role: "Servis",
    active: true,
  },
  {
    id: "p2",
    name: "Mehmet Usta",
    phone: "5334445566",
    role: "Montaj",
    active: true,
  },
];

const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    addPersonnel: {
      reducer(state, action: PayloadAction<Personnel>) {
        state.unshift(action.payload);
      },
      prepare(payload: AddPersonnelPayload) {
        return {
          payload: {
            ...payload,
            id: nanoid(),
            active: true,
          },
        };
      },
    },

    updatePersonnel(state, action: PayloadAction<Personnel>) {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    setPersonnelActive(
      state,
      action: PayloadAction<{ id: string; active: boolean }>
    ) {
      const personnel = state.find((p) => p.id === action.payload.id);
      if (personnel) {
        personnel.active = action.payload.active;
      }
    },
  },
});

export const { addPersonnel, updatePersonnel, setPersonnelActive } =
  personnelSlice.actions;

export default personnelSlice.reducer;
