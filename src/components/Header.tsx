import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Input,
  InputAdornment,
  createStyles,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { School, Map, QuestionAnswer, Search } from "@mui/icons-material";

import Icons from "assets/Icons";
import { paths } from "configs/routes";
import colors from "utils/colors";

const routes = [
  { name: "Courses", path: paths.courses, icon: School },
  { name: "Roadmap", path: paths.roadmap, icon: Map },
  { name: "FAQs", path: paths.faq, icon: QuestionAnswer },
];

const Header: FC = () => {
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
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to search"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
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
      <Typography className={styles.text}>Register</Typography>
    </Box>
  );
};

export default Header;

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      cursor: "pointer",
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
