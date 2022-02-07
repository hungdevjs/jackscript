import { FC } from "react";
import { Backdrop, CircularProgress, createStyles, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Loading: FC = () => {
  const styles = useStyles();

  return (
    <Backdrop open={true} className={styles.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.common.white,
    },
  })
);

export default Loading;
