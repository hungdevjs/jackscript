import { createSlice, Reducer } from "@reduxjs/toolkit";

import { LanguageState } from "interfaces/language";
import { RootState } from "./store";

const initialState: LanguageState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setLanguage: {
      reducer: (state, action) => {
        state.language = action.payload;
      },
      prepare: (payload: "en" | "vi"): any => {
        return { payload: payload ?? "en" };
      },
    },
  },
});

export const { reset, setLanguage } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.lang.language;

export default languageSlice.reducer as Reducer;
