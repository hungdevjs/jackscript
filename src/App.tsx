import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

import "./App.css";

import Header from "components/Header";
import Loading from "components/Loading";
import AuthRoutes from "navigations/AuthRoutes";
import MainRoutes from "navigations/MainRoutes";

import { selectInitialized, selectUser, setUser } from "redux/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInitialized);
  const user = useSelector(selectUser);

  const getUser = useCallback(async () => {
    // dispatch(setUser())
    dispatch(setUser({ email: "hungdev.js@gmail.com", username: "hungdevjs" }));
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, []);

  if (!initialized) return <Loading />;

  return (
    <Box>
      <Header />
      {user ? <MainRoutes /> : <AuthRoutes />}
    </Box>
  );
};

export default App;
