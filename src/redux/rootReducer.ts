import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import languageReducer from "./languageSlice";
import tipSlice from "./tipSlice";
import roadmapSlice from "./roadmapSlice";
import courseSlice from "./courseSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  lang: languageReducer,
  tip: tipSlice,
  roadmap: roadmapSlice,
  course: courseSlice,
});

export default rootReducer;
