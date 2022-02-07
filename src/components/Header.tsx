import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, createStyles, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { School, Map, QuestionAnswer, Search } from "@mui/icons-material";

import Icons from "assets/Icons";
import { paths } from "configs/routes";
import colors from "utils/colors";

import { selectUser } from "redux/authSlice";

const routes = [
  { name: "Courses", path: paths.courses, icon: School },
  { name: "Roadmap", path: paths.roadmap, icon: Map },
  { name: "FAQs", path: paths.faq, icon: QuestionAnswer },
];

const Header: FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    // search logic
  }, [search]);

  const styles = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      paddingX={5}
      paddingY={2}
      borderBottom={`1px solid ${colors.secondary}`}
    >
      <img
        src={Icons.jackscript}
        width={70}
        className={styles.logo}
        onClick={() => navigate(paths.home)}
      />
      <Box display="flex" alignItems="center">
        <Search color="primary" />
        <input
          className={styles.input}
          placeholder="Type to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box display="flex">
        {routes.map((route) => (
          <Box mx={5}>
            <Typography
              className={styles.text}
              style={pathname === route.path ? { color: colors.primary } : {}}
              onClick={() => navigate(route.path)}
            >
              {route.name}
            </Typography>
          </Box>
        ))}
      </Box>
      {!user && (
        <Typography
          className={styles.text}
          onClick={() => navigate(paths.register)}
        >
          Register
        </Typography>
      )}
    </Box>
  );
};

export default Header;

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      cursor: "pointer",
    },
    input: {
      border: 0,
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      marginLeft: theme.spacing(2),
      fontSize: "1rem",
      color: colors.dark,
      "&:focus": {
        outline: "none",
      },
    },
    text: {
      fontWeight: 700,
      fontSize: "1.25rem",
      cursor: "pointer",
      "&:hover": {
        color: colors.primary,
      },
    },
  })
);
