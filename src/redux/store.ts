import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import { AuthState } from "interfaces/auth";
import { LanguageState } from "interfaces/language";
import { TipState } from "interfaces/tip";
import { RoadmapState } from "interfaces/roadmap";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  auth: AuthState;
  lang: LanguageState;
  tip: TipState;
  roadmap: RoadmapState;
};

export default store;
