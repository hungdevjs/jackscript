import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";

import { TipState } from "interfaces/tip";
import { RootState } from "./store";

import { getTip } from "../services/tip.service";

const initialState: TipState | null = null;

export const getTipThunk = createAsyncThunk<any>("tip/get", async () => {
  const res = await getTip();
  return res.data;
});

const tipSlice = createSlice({
  name: "tip",
  initialState,
  reducers: {
    reset: () => initialState,
    setTip: {
      reducer: (state, action) => {
        state = action.payload;
      },
      prepare: (payload: TipState): any => {
        return { payload };
      },
    },
  },
  extraReducers: {
    //@ts-ignore
    [getTipThunk.fulfilled]: (state: TipState, { payload }: any) => (state = payload),
  },
});

export const { reset, setTip } = tipSlice.actions;

export const selectTip = (state: RootState) => state.tip;

export default tipSlice.reducer as Reducer;
