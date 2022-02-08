import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import languageReducer from "./languageSlice";
import tipSlice from "./tipSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  lang: languageReducer,
  tip: tipSlice,
});

export default rootReducer;
