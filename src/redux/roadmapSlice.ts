import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";

import { RoadmapState } from "interfaces/roadmap";
import { RootState } from "./store";

import { getRoadmap } from "../services/roadmap.service";

const initialState: RoadmapState = {
  items: null,
};

export const getRoadmapThunk = createAsyncThunk<any>("roadmap/get", async () => {
  const res = await getRoadmap();
  return res.data;
});

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {
    reset: () => initialState,
    setRoadmap: {
      reducer: (state, action) => {
        state.items = action.payload;
      },
      prepare: (payload: RoadmapState): any => {
        return { payload };
      },
    },
  },
  extraReducers: {
    //@ts-ignore
    [getRoadmapThunk.fulfilled]: (state: RoadmapState, { payload }: any) => {
      state.items = payload;
    },
  },
});

export const { reset, setRoadmap } = roadmapSlice.actions;

export const selectRoadmap = (state: RootState) => state.roadmap.items;

export default roadmapSlice.reducer as Reducer;
