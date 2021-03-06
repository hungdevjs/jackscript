import { FC, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";

import Loading from "components/Loading";
import { selectUser } from "redux/authSlice";
import { getCourses, selectSortedCourses } from "redux/courseSlice";
import useMultilanguage from "hooks/useMultilanguage";
import colors, { cardColors } from "utils/colors";
import { paths } from "configs/routes";
import { canStartCourse, isContinueCourse } from "./utils/helpers";

const Courses: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(selectSortedCourses);
  const user = useSelector(selectUser);
  const { language, translator } = useMultilanguage();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const goToCourse = useCallback(
    (id: string) => {
      navigate(paths.courseDetail.replace(":id", id));
    },
    [navigate]
  );

  if (!courses) return <Loading />;

  return (
    <Box p={4}>
      <Typography variant="h5" align="center">
        {translator("Course.Courses")}
      </Typography>
      <Typography color={colors.dark} fontSize="0.9rem" align="center">
        {translator("Course.CoursesPublished", { count: courses.length })}
      </Typography>
      <Box mt={4}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={course.id}>
              <Paper
                elevation={4}
                style={{
                  // @ts-ignore
                  backgroundColor: cardColors[course.level],
                  borderRadius: 4,
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box p={2} flexGrow={1} display="flex" flexDirection="column">
                  <Typography color={colors.white} fontWeight="bold">
                    {course.level}
                  </Typography>
                  <Box mt={2} flexGrow={1}>
                    <Typography variant="h5" color={colors.white} fontWeight="bold">
                      {course.name}
                    </Typography>
                    <Typography fontSize="0.9rem" color={colors.white}>
                      {course.numberOfLessons} {translator("Course.lessons")}
                    </Typography>
                    <Box pt={3}>
                      <Typography color={colors.white} fontWeight="bold">
                        {language === "vi" ? course.descriptionVi : course.descriptionEn}
                      </Typography>
                    </Box>
                  </Box>
                  <Box p={2} display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Button
                      variant="contained"
                      onClick={() => goToCourse(course.id)}
                      disabled={!canStartCourse(user, course.level)}
                    >
                      <Typography fontWeight="bold">
                        {translator(isContinueCourse(user, course.id) ? "Course.Continue" : "Course.Start")}
                      </Typography>
                    </Button>
                    <img src={course.image} alt="course" />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Courses;
