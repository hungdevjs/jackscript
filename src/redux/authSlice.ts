import { createSlice, Reducer } from "@reduxjs/toolkit";

import { AuthState, User, UserCourse } from "interfaces/auth";
import { RootState } from "interfaces/store";

const initialState: AuthState = {
  initialized: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: {
      reducer: (state, action) => {
        state.user = action.payload;
        state.initialized = true;
      },
      prepare: (payload: User | null): any => {
        return { payload };
      },
    },
    updateLesson: {
      reducer: (state, action) => {
        const { courseId, lessonOrder } = action.payload;
        const userCourses = state.user?.courses.map((item) => {
          if (item.courseId === courseId) return { ...item, lessonOrder };
          return item;
        }) as UserCourse[];

        if (state.user) {
          state.user.courses = userCourses;
        }
      },
      prepare: (payload: { courseId: string; lessonOrder: number }): any => {
        return { payload };
      },
    },
  },
});

export const { reset, setUser, updateLesson } = authSlice.actions;

export const selectInitialized = (state: RootState) => state.auth.initialized;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer as Reducer;
