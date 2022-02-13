import { createSlice, Reducer, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import { CourseState } from "interfaces/course";
import { RootState } from "interfaces/store";

import { get, getById, start, getLesson } from "../services/course.service";

const initialState: CourseState = {
  items: null,
  courseDetailInitialized: false,
  courseDetail: null,
  lessonDetailInitialized: false,
  lessonDetail: null,
};

export const getCourses = createAsyncThunk<any>("course/get", async () => {
  const res = await get();
  return res.data;
});

// @ts-ignore
export const getCourseById = createAsyncThunk<any>("course/getById", async (id: string, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { user } = state.auth;

  if (!user) return null;
  await start(id);
  const res = await getById(id);
  return res.data;
});

export const getLessonById = createAsyncThunk<any>(
  "course/getLesson",
  // @ts-ignore
  async ({ lessonId, courseId }: { lessonId: string; courseId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { user } = state.auth;
    if (!user) return null;

    const res = await getLesson(courseId, lessonId);
    return res.data;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourseDetail: (state: CourseState) => {
      state.courseDetail = null;
      state.courseDetailInitialized = false;
    },
    resetLessonDetail: (state: CourseState) => {
      state.lessonDetail = null;
      state.lessonDetailInitialized = false;
    },
  },
  extraReducers: {
    // @ts-ignore
    [getCourses.fulfilled]: (state: CourseState, { payload }: any) => {
      state.items = payload;
    },
    // @ts-ignore
    [getCourseById.fulfilled]: (state: CourseState, { payload }: any) => {
      state.courseDetail = payload;
      state.courseDetailInitialized = true;
    },
    // @ts-ignore
    [getCourseById.rejected]: (state: CourseState, { payload }: any) => {
      state.courseDetailInitialized = true;
    },
    // @ts-ignore
    [getLessonById.fulfilled]: (state: CourseState, { payload }: any) => {
      state.lessonDetail = payload;
      state.lessonDetailInitialized = true;
    },
    // @ts-ignore
    [getLessonById.rejected]: (state: CourseState, { payload }: any) => {
      state.lessonDetailInitialized = true;
    },
  },
});

export const { resetCourseDetail, resetLessonDetail } = courseSlice.actions;

export const selectCourses = (state: RootState) => state.course.items || [];
export const selectCourseDetail = (state: RootState) => ({
  detailInitialized: state.course.courseDetailInitialized,
  detail: state.course.courseDetail,
});
export const selectLessonDetail = (state: RootState) => ({
  detailInitialized: state.course.lessonDetailInitialized,
  detail: state.course.lessonDetail,
});

export const selectSortedCourses = createSelector([selectCourses], (courses) => {
  const newbieCourses = courses.filter((course) => course.level === "NEWBIE");
  const fresherCourses = courses.filter((course) => course.level === "FRESHER");
  const juniorCourses = courses.filter((course) => course.level === "JUNIOR");
  const seniorCourses = courses.filter((course) => course.level === "SENIOR");

  return [...newbieCourses, ...fresherCourses, ...juniorCourses, ...seniorCourses];
});

export default courseSlice.reducer as Reducer;
