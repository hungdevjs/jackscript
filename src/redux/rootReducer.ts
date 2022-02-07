import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import languageReducer from "./languageSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  lang: languageReducer,
});

export default rootReducer;
