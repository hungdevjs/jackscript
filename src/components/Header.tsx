import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Collapse,
  createStyles,
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Search, Menu, Close } from "@mui/icons-material";

import Icons from "assets/Icons";
import { paths } from "configs/routes";
import colors from "utils/colors";

import { selectUser } from "redux/authSlice";
import useMultilanguage from "hooks/useMultilanguage";

const Header: FC = () => {
  const { language, translator, changeLanguage } = useMultilanguage();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    // search logic
  }, [search]);

  const styles = useStyles();

  const routes = [
    { name: translator("Header.Courses"), path: paths.courses },
    { name: translator("Header.Roadmap"), path: paths.roadmap },
    { name: translator("Header.FAQs"), path: paths.faq },
  ];

  const authRoutes = [
    { name: translator("Header.Login"), path: paths.login },
    { name: translator("Header.Register"), path: paths.register },
  ];

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={isLg ? "flex-start" : "space-around"}
        paddingX={5}
        paddingY={2}
        borderBottom={`1px solid ${colors.secondary}`}
      >
        <img
          src={Icons.jackscript}
          alt="logo"
          width={70}
          className={styles.logo}
          onClick={() => navigate(paths.home)}
        />
        {!isLg ? (
          <>
            <Box display="flex" alignItems="center">
              <Search color="primary" />
              <input
                className={styles.input}
                placeholder={translator("Header.TypeToSearch")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box display="flex">
              {routes.map((route) => (
                <Box mx={5} key={route.name}>
                  <Typography
                    fontWeight="bold"
                    color={colors.dark}
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
              <Box display="flex" alignItems="center" gap={3}>
                {authRoutes.map((route) => (
                  <Typography
                    key={route.name}
                    fontWeight="bold"
                    color={colors.dark}
                    className={styles.text}
                    onClick={() => navigate(route.path)}
                  >
                    {route.name}
                  </Typography>
                ))}
              </Box>
            )}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{translator("Header.Language")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label={translator("Header.Language")}
                  // @ts-ignore
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <MenuItem value="en">{translator("Header.English")}</MenuItem>
                  <MenuItem value="vi">{translator("Header.Vietnamese")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        ) : (
          <Box flexGrow={1} display="flex" alignItems="center" justifyContent="flex-end">
            <Box className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <Close color="primary" /> : <Menu color="primary" />}
            </Box>
          </Box>
        )}
      </Box>
      {isLg && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box display="flex" flexDirection="column" alignItems="center" borderBottom={`1px solid ${colors.secondary}`}>
            {[...routes, ...(!user ? authRoutes : [])].map((route) => (
              <Box key={route.name} paddingY={2}>
                <Typography
                  fontWeight="bold"
                  color={colors.dark}
                  className={styles.text}
                  style={pathname === route.path ? { color: colors.primary } : {}}
                  onClick={() => navigate(route.path)}
                >
                  {route.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </>
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
      cursor: "pointer",
      "&:hover": {
        color: colors.primary,
      },
    },
    toggleButton: {
      cursor: "pointer",
    },
  })
);
