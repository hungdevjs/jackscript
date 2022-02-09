import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";

import { RoadmapState } from "interfaces/roadmap";
import { RootState } from "./store";

import { get } from "../services/roadmap.service";

const initialState: RoadmapState = {
  items: null,
};

export const getRoadmap = createAsyncThunk<any>("roadmap/get", async () => {
  const res = await get();
  return res.data;
});

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    //@ts-ignore
    [getRoadmap.fulfilled]: (state: RoadmapState, { payload }: any) => {
      state.items = payload;
    },
  },
});

export const { reset } = roadmapSlice.actions;

export const selectRoadmap = (state: RootState) => state.roadmap.items;

export default roadmapSlice.reducer as Reducer;
