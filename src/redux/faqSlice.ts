import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";

import { FaqState } from "interfaces/faq";
import { RootState } from "interfaces/store";

import { get } from "../services/faq.service";

const initialState: FaqState = {
  items: null,
};

export const getFaq = createAsyncThunk<any>("faq/get", async () => {
  const res = await get();
  return res.data;
});

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    //@ts-ignore
    [getFaq.fulfilled]: (state: RoadmapState, { payload }: any) => {
      state.items = payload;
    },
  },
});

export const { reset } = faqSlice.actions;

export const selectFaq = (state: RootState) => state.faq.items;

export default faqSlice.reducer as Reducer;
