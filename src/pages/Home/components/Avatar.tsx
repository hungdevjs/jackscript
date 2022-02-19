import { FC, useState } from "react";
import { Box, Avatar as NativeAvatar } from "@mui/material";
import { PhotoCameraBack } from "@mui/icons-material";

import colors from "utils/colors";

interface Props {
  url: string;
  onClick: Function;
}

const Avatar: FC<Props> = ({ url, onClick }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Box
      position="relative"
      width={100}
      height={100}
      borderRadius="50%"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NativeAvatar alt="user" src={url} sx={{ width: 100, height: 100 }} />
      {hovered && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          position="absolute"
          top={0}
          left={0}
          width={100}
          height={100}
          borderRadius="50%"
          overflow="hidden"
          bgcolor={colors.opacityBlack}
          zIndex={2}
          style={{ cursor: "pointer" }}
          onClick={() => onClick()}
        >
          <Box height={40} display="flex" justifyContent="center" alignItems="center" bgcolor={colors.opacityWhite}>
            <PhotoCameraBack />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Avatar;
