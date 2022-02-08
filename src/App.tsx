import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

import "./App.css";

import Header from "components/Header";
import Loading from "components/Loading";
import AuthRoutes from "navigations/AuthRoutes";
import MainRoutes from "navigations/MainRoutes";

import { selectInitialized, selectUser, setUser } from "redux/authSlice";
import { getTipThunk } from "redux/tipSlice";
import { getAccessToken } from "utils/helpers";
import { getInfo } from "services/account.service";
import { ACCESS_TOKEN } from "utils/constants";

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInitialized);
  const user = useSelector(selectUser);

  const getAuth = useCallback(async () => {
    try {
      const token = getAccessToken();
      if (!token) throw new Error();
      const res = await getInfo();
      dispatch(setUser(res.data));
    } catch {
      dispatch(setUser(null));
      localStorage.removeItem(ACCESS_TOKEN);
    }
  }, [dispatch]);

  const init = useCallback(async () => {
    dispatch(getTipThunk());
    getAuth();
    // dispatch(setUser({ email: "hungdev.js@gmail.com", username: "hungdevjs" }));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, []);

  if (!initialized) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flexGrow={1} display="flex" flexDirection="column">
        {user ? <MainRoutes /> : <AuthRoutes />}
      </Box>
    </Box>
  );
};

export default App;
