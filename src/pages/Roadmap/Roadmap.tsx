import { FC, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Paper,
  Stack,
  Button,
  createStyles,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import Loading from "components/Loading";
import { selectRoadmap, getRoadmap } from "redux/roadmapSlice";
import useMultilanguage from "hooks/useMultilanguage";
import { paths } from "configs/routes";
import colors, { cardColors } from "utils/colors";

const Roadmap: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roadmaps = useSelector(selectRoadmap);
  const { translator } = useMultilanguage();
  const styles = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [activeStep, setActiveStep] = useState<number>(0);

  const back = useCallback(() => setActiveStep(activeStep - 1), [activeStep]);
  const next = useCallback(() => setActiveStep(activeStep + 1), [activeStep]);
  const reset = useCallback(() => setActiveStep(0), []);

  const goToCourse = useCallback(
    (id: string) => {
      navigate(paths.courseDetail.replace(":id", id));
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(getRoadmap());
  }, [dispatch]);

  if (!roadmaps) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={4}>
      <Box mb={3}>
        <Typography variant="h5" align="center">
          {translator("Roadmap.Roadmap")}
        </Typography>
      </Box>
      <Stepper activeStep={activeStep} orientation={isMd ? "vertical" : "horizontal"}>
        {roadmaps.map((item) => (
          <Step key={item.id}>
            <Box p={isMd ? 0 : 3}>
              <StepLabel optional={item.level}>
                <Box mb={1}>
                  <img src={item.image} width={80} alt="step" />
                </Box>
              </StepLabel>
              <StepContent>
                <Stack spacing={2}>
                  {item.courses.map((course) => (
                    <Paper
                      key={course.id}
                      elevation={4}
                      className={styles.courseItem}
                      // @ts-ignore
                      style={{ backgroundColor: cardColors[course.level] }}
                      onClick={() => goToCourse(course.id)}
                    >
                      <Box p={2}>
                        <Typography color={colors.white} fontWeight="bold">
                          {course.name}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
                <Box mt={2} display="flex" gap={3}>
                  {activeStep < roadmaps.length && (
                    <Button onClick={next} variant="contained">
                      {activeStep === roadmaps.length - 1
                        ? translator("Roadmap.Finish")
                        : translator("Roadmap.Continue")}
                    </Button>
                  )}
                  {activeStep > 0 && <Button onClick={back}>{translator("Roadmap.Back")}</Button>}
                </Box>
              </StepContent>
            </Box>
          </Step>
        ))}
      </Stepper>
      {activeStep === roadmaps.length && (
        <Box mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography>{translator("Roadmap.AllCoursesFinished")}</Typography>
          <Typography>{translator("Roadmap.CongratsNewDeveloper")}</Typography>
          <Button onClick={reset}>{translator("Roadmap.Reset")}</Button>
        </Box>
      )}
    </Box>
  );
};

export default Roadmap;

const useStyles: any = makeStyles(() =>
  createStyles({
    courseItem: {
      cursor: "pointer",
      transition: ".2s ease",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  })
);
