import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";

import { TipState } from "interfaces/tip";
import { RootState } from "./store";

import { get } from "../services/tip.service";

const initialState: TipState | null = null;

export const getTip = createAsyncThunk<any>("tip/get", async () => {
  const res = await get();
  return res.data;
});

const tipSlice = createSlice({
  name: "tip",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    //@ts-ignore
    [getTip.fulfilled]: (state: TipState, { payload }: any) => (state = payload),
  },
});

export const { reset } = tipSlice.actions;

export const selectTip = (state: RootState) => state.tip;

export default tipSlice.reducer as Reducer;
