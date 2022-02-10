import { createSlice, Reducer, createAsyncThunk } from "@reduxjs/toolkit";

import { CourseState } from "interfaces/course";
import { RootState } from "./store";

import { get } from "../services/course.service";

const initialState: CourseState = {
  items: null,
};

export const getCourses = createAsyncThunk<any>("course/get", async () => {
  const res = await get();
  return res.data;
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    //@ts-ignore
    [getCourses.fulfilled]: (state: CourseState, { payload }: any) => {
      state.items = payload;
    },
  },
});

export const { reset } = courseSlice.actions;

export const selectCourses = (state: RootState) => state.course.items;

export default courseSlice.reducer as Reducer;
