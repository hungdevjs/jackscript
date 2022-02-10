import { FC, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography, createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Loading from "components/Loading";
import { getCourseById, selectCourseDetail, resetCourseDetail } from "redux/courseSlice";
import useMultilanguage from "hooks/useMultilanguage";
import colors from "utils/colors";
import { paths } from "configs/routes";

const CourseDetail: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { detail, detailInitialized } = useSelector(selectCourseDetail);
  const { language, translator } = useMultilanguage();
  const styles = useStyles();

  const goToLesson = useCallback(
    (lessonId: string) => {
      navigate(paths.lesson.replace(":courseId", id as string).replace(":lessonId", lessonId));
    },
    [navigate, id]
  );

  useEffect(() => {
    dispatch(getCourseById(id));
    return () => {
      dispatch(resetCourseDetail());
    };
  }, [dispatch, id]);

  if (!detailInitialized) return <Loading />;

  if (!detail) return <Typography>Youre not able to view this course</Typography>;

  return (
    <Box p={4}>
      <Box mb={2}>
        <Typography variant="h5">{detail.name}</Typography>
        <Typography fontSize="0.9rem" color={colors.dark}>
          {detail.lessons.length} {translator("Course.lessons")}
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography color={colors.dark}>{language === "vi" ? detail.descriptionVi : detail.descriptionEn}</Typography>
      </Box>
      <Grid container spacing={2}>
        {detail.lessons.map((lesson) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={lesson.id}>
            <Paper elevation={3} className={styles.lessonItem} onClick={() => goToLesson(lesson.id)}>
              <Box padding={2}>
                <Typography>{language === "vi" ? lesson.nameVi : lesson.nameEn}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetail;

const useStyles: any = makeStyles(() =>
  createStyles({
    lessonItem: {
      cursor: "pointer",
      transition: "0.2s ease",
      "&:hover": {
        transform: "scale(1.02)",
      },
    },
  })
);
