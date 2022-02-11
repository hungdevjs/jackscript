import { FC } from "react";
import { Box, Typography } from "@mui/material";

import Images from "assets/Images";
import colors from "utils/colors";

interface Props {
  text: string;
  suggestion: string;
}

const NoAccessible: FC<Props> = ({ text, suggestion }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box mb={2}>
        <img src={Images.rooms} alt="no-accessible" />
      </Box>
      <Box mb={2}>
        <Typography align="center" fontWeight="bold">
          {text}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography align="center" fontSize="0.9rem" color={colors.dark}>
          {suggestion}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoAccessible;
