import { FC, useEffect, useState, useCallback } from "react";
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import Loading from "components/Loading";
import { selectRoadmap, getRoadmapThunk } from "redux/roadmapSlice";

const Roadmap: FC = () => {
  const dispatch = useDispatch();
  const roadmaps = useSelector(selectRoadmap);
  const styles = useStyles();

  const [activeStep, setActiveStep] = useState<number>(0);

  const back = useCallback(() => setActiveStep(activeStep - 1), [activeStep]);
  const next = useCallback(() => setActiveStep(activeStep + 1), [activeStep]);
  const reset = useCallback(() => setActiveStep(0), []);

  useEffect(() => {
    dispatch(getRoadmapThunk());
  }, [dispatch]);

  if (!roadmaps) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" my={5}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {roadmaps.map((item) => (
          <Step key={item.id}>
            <StepLabel optional={item.level}>
              <Box mb={2}>
                <img src={item.image} width={80} />
              </Box>
            </StepLabel>
            <StepContent>
              <Stack spacing={2}>
                {item.courses.map((course) => (
                  <Paper key={course.id} elevation={4} className={styles.courseItem}>
                    <Box p={2}>{course.name}</Box>
                  </Paper>
                ))}
              </Stack>
              <Box mt={2} display="flex" gap={3}>
                {activeStep < roadmaps.length && (
                  <Button onClick={next} variant="contained">
                    {activeStep === roadmaps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                )}
                {activeStep > 0 && <Button onClick={back}>Back</Button>}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === roadmaps.length && (
        <Box mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography>All courses are finished.</Typography>
          <Typography>Congrats new developer!</Typography>
          <Button onClick={reset}>Reset</Button>
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
