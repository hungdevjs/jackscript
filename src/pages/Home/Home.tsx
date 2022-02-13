import { FC, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Tabs, Tab, Avatar, Button, Typography, Paper, createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Profile from "./components/Profile";
import Progress from "./components/Progress";
import Plan from "./components/Plan";
import Settings from "./components/Settings";

import { selectUser } from "redux/authSlice";
import colors from "utils/colors";
import useMultilanguage from "hooks/useMultilanguage";

const Home: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const styles = useStyles();
  const [tab, setTab] = useState<number>(0);

  const { language, translator } = useMultilanguage();

  const tabs = [
    { name: translator("Home.Profile"), component: Profile },
    // { name: translator("Home.Progress"), component: Progress },
    { name: translator("Home.Plan"), component: Plan },
    { name: translator("Home.Settings"), component: Settings },
  ];

  const Content = useMemo(() => {
    return tabs[tab]?.component;
  }, [tabs, tab]);

  return (
    <Box py={4}>
      <Grid container className={styles.container}>
        <Grid item xs={11} sm={11} md={8} lg={6} xl={6}>
          <Box p={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2}>
                <Avatar
                  alt="user"
                  src="https://res.cloudinary.com/dzlqhq434/image/upload/v1644311731/tips/Emi-ZnAVkAEqtVq_esdtmh.jpg"
                  sx={{ width: 100, height: 100, boxShadow: `` }}
                  // variant="rounded"
                />
              </Box>
              <Box>
                <Typography fontSize="1.1rem" fontWeight={600} align="center">
                  {user?.name}
                </Typography>
                <Typography fontSize="0.9rem" color={colors.dark} align="center">
                  {user?.level}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Tabs value={tab} onChange={(_e, newTab) => setTab(newTab)}>
              {tabs.map((item) => (
                <Tab
                  key={item.name}
                  label={
                    <Typography fontWeight={600} textTransform="none">
                      {item.name}
                    </Typography>
                  }
                />
              ))}
            </Tabs>
          </Box>
          <Box pt={2}>
            <Content />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

const useStyles: any = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
