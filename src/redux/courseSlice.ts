import { createSlice, Reducer, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

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

export const selectCourses = (state: RootState) => state.course.items || [];

export const selectSortedCourses = createSelector([selectCourses], (courses) => {
  const newbieCourses = courses.filter((course) => course.level === "NEWBIE");
  const fresherCourses = courses.filter((course) => course.level === "FRESHER");
  const juniorCourses = courses.filter((course) => course.level === "JUNIOR");
  const seniorCourses = courses.filter((course) => course.level === "SENIOR");

  return [...newbieCourses, ...fresherCourses, ...juniorCourses, ...seniorCourses];
});

export default courseSlice.reducer as Reducer;
