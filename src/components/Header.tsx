import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  createStyles,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  RestoreOutlined,
  FavoriteBorderOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import Icons from "assets/Icons";

const Header: FC = () => {
  const styles = useStyles();

  return (
    <Box display="flex" alignItems="center" paddingX={3} paddingY={2}>
      <img src={Icons.jackscript} width={70} />
      <BottomNavigation
        showLabels
        value={0}
        onChange={(event, newValue) => {
          // setValue(newValue);
        }}
      >
        <BottomNavigationAction
          // label={<RestoreOutlined />}
          label="Test123132"
          icon={<RestoreOutlined />}
          // icon="Test"
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteBorderOutlined />}
        />
        <BottomNavigationAction label="Nearby" icon={<LocationOnOutlined />} />
      </BottomNavigation>
    </Box>
  );
};

export default Header;

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);
