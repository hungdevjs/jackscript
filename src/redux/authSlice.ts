import { createSlice, Reducer } from "@reduxjs/toolkit";

import { AuthState, User } from "interfaces/auth";
import { RootState } from "./store";

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
  },
});

export const { reset, setUser } = authSlice.actions;

export const selectInitialized = (state: RootState) => state.auth.initialized;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer as Reducer;
